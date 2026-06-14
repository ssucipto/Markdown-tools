#!/bin/bash
# Generate Cursor slash commands and skills from ACP command sources.
# Maps agent/commands/acp.init.md -> /acp-init (.cursor/commands + .cursor/skills)

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
CMD_DIR="$ROOT/agent/commands"
CMD_OUT_DIR="$ROOT/.cursor/commands"
SKILL_OUT_DIR="$ROOT/.cursor/skills"
RULES_DIR="$ROOT/.cursor/rules"

mkdir -p "$CMD_OUT_DIR" "$SKILL_OUT_DIR" "$RULES_DIR"

to_slash_name() {
  local name="${1%.md}"
  echo "$name" | sed 's/\./-/g'
}

extract_purpose() {
  local file="$1"
  local purpose
  purpose=$(grep -m1 '^\*\*Purpose\*\*:' "$file" | sed 's/^\*\*Purpose\*\*: //' | sed 's/[[:space:]]*$//' || true)
  if [ -z "$purpose" ]; then
    purpose="ACP Enhanced command"
  fi
  printf '%s' "$purpose" | sed 's/"/\\"/g'
}

write_command_body() {
  local slash_name="$1"
  local base="$2"
  cat <<EOF
# ACP Command: /${slash_name}

Execute ACP Enhanced command \`/${slash_name}\`.

1. Read and follow **every step** in \`agent/commands/${base}\`.
2. Treat text after the command in the user's message as command arguments.
3. Run the command header from the source file, then continue unless the source explicitly waits for input.

**Canonical source**: \`agent/commands/${base}\`
**Equivalent invocations**: \`/${slash_name}\`, \`@${slash_name}\`, \`@agent/commands/${base}\`
EOF
}

# Remove stale generated skills before regenerating
find "$SKILL_OUT_DIR" -mindepth 1 -maxdepth 1 -type d \( -name 'acp-*' -o -name 'git-*' \) -exec rm -rf {} + 2>/dev/null || true

count=0
for cmd_file in "$CMD_DIR"/acp.*.md "$CMD_DIR"/git.*.md; do
  [ -f "$cmd_file" ] || continue
  base=$(basename "$cmd_file")
  slash_name=$(to_slash_name "$base")
  purpose=$(extract_purpose "$cmd_file")

  # Legacy slash commands (.cursor/commands/) — Cursor < 2.4 and compatibility
  cat > "$CMD_OUT_DIR/${slash_name}.md" <<EOF
---
description: "${purpose}"
---

$(write_command_body "$slash_name" "$base")
EOF

  # Cursor 2.4+ skills (.cursor/skills/) — surfaced in / menu as /acp-*
  mkdir -p "$SKILL_OUT_DIR/${slash_name}"
  cat > "$SKILL_OUT_DIR/${slash_name}/SKILL.md" <<EOF
---
name: ${slash_name}
description: "${purpose}"
disable-model-invocation: true
---

$(write_command_body "$slash_name" "$base")
EOF

  count=$((count + 1))
done

# Agent rule: map /acp-*, @acp-*, and @agent/commands/* to full execution
cat > "$RULES_DIR/acp-slash-commands.mdc" <<'EOF'
---
description: Execute ACP Enhanced slash commands (/acp-*) and aliases — load full steps from agent/commands/
alwaysApply: true
---

# ACP Slash Commands

When the user invokes an ACP command, **execute** it — do not only read the wrapper or skill file.

## Canonical invocation

Prefer `/acp-<action>` (e.g. `/acp-init`, `/acp-plan`, `/acp-status`).

## Equivalent forms (same execution path)

| Form | Example |
|------|---------|
| Slash command / skill | `/acp-init` |
| Mention alias | `@acp-init` |
| Source file | `@agent/commands/acp.init.md` |

## Execution rules

1. Resolve the command to its canonical source under `agent/commands/`.
2. Read and follow **every step** in that source file.
3. Treat any text after the command in the user's message as CLI-style arguments.
4. Run associated scripts listed in the command `**Scripts**:` field when required.
5. Do not substitute a summary for the full command workflow.

See `agent/wiki/cursor-integration.md` for sync and troubleshooting.
EOF

echo "Generated ${count} Cursor slash commands in .cursor/commands/"
echo "Generated ${count} Cursor skills in .cursor/skills/"
echo "Updated .cursor/rules/acp-slash-commands.mdc"
