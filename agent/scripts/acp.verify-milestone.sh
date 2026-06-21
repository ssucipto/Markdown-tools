#!/usr/bin/env bash
# ACP Milestone Verification Gate
# Checks that a milestone is buildable, tested, and documented before marking complete.
# Usage: ./agent/scripts/acp.verify-milestone.sh <MILESTONE_ID>
# Exit code: 0 if all checks pass, 1 if any check fails

set -euo pipefail
trap 'echo "❌ Verification gate failed unexpectedly at line $LINENO"; exit 1' ERR

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

MILESTONE_ID="${1:-}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

if [ -z "$MILESTONE_ID" ]; then
  echo "Usage: $0 <MILESTONE_ID>"
  echo "Example: $0 M8"
  exit 1
fi

PASS=0
FAIL=0

check() {
  local name="$1"
  local result="$2"
  if [ "$result" = "pass" ]; then
    echo -e "  ${GREEN}✓${NC} $name"
    PASS=$((PASS + 1))
  else
    echo -e "  ${RED}✗${NC} $name"
    FAIL=$((FAIL + 1))
  fi
}

echo ""
echo "┌─────────────────────────────────────────────┐"
echo "│  ACP Milestone Verification Gate            │"
echo "│  Milestone: $MILESTONE_ID"
echo "└─────────────────────────────────────────────┘"
echo ""

# ── Check 1: node_modules exists ──
echo "📦 Dependencies"
if [ -d "$PROJECT_DIR/node_modules" ]; then
  check "node_modules/ exists" "pass"
else
  check "node_modules/ exists (run npm install)" "fail"
fi
echo ""

# ── Check 2: Build succeeds ──
echo "🔨 Build"
if (cd "$PROJECT_DIR" && npm run build >/dev/null 2>&1); then
  check "npm run build" "pass"
else
  check "npm run build" "fail"
fi

if (cd "$PROJECT_DIR" && npm run build:lib >/dev/null 2>&1); then
  check "npm run build:lib" "pass"
else
  check "npm run build:lib" "fail"
fi
echo ""

# ── Check 3: TypeScript compiles ──
echo "📝 TypeScript"
if (cd "$PROJECT_DIR" && npm run typecheck >/dev/null 2>&1); then
  check "npm run typecheck" "pass"
else
  check "npm run typecheck" "fail"
fi
echo ""

# ── Check 4: Tests pass ──
echo "🧪 Tests"
if (cd "$PROJECT_DIR" && npm test >/dev/null 2>&1); then
  check "npm test" "pass"
else
  check "npm test" "fail"
fi
echo ""

# ── Check 5: Lint ──
echo "🔍 Lint"
if (cd "$PROJECT_DIR" && npm run lint >/dev/null 2>&1); then
  check "npm run lint" "pass"
else
  check "npm run lint" "fail"
fi
echo ""

# ── Check 6: Security audit ──
echo "🛡️ Security audit"
if (cd "$PROJECT_DIR" && npm audit --audit-level=high --omit=dev >/dev/null 2>&1); then
  check "npm audit (high/critical)" "pass"
else
  check "npm audit (high/critical)" "fail"
fi
echo ""

# ── Check 7: Audit report exists ──
echo "📋 Audit report"
REPORT_FILE=""
for f in "$PROJECT_DIR/agent/reports/"*; do
  REPORT_FILE="$f"
  break
done
if [ -n "$REPORT_FILE" ] && [ -f "$REPORT_FILE" ]; then
  check "Audit report exists: $(basename "$REPORT_FILE")" "pass"
else
  check "Audit report in agent/reports/" "fail"
fi
echo ""

# ── Summary ──
echo "┌─────────────────────────────────────────────┐"
echo "│  Summary                                    │"
echo "├─────────────────────────────────────────────┤"
printf "│  ${GREEN}%-2d passed${NC} / ${RED}%-2d failed${NC}                        │\n" "$PASS" "$FAIL"
echo "└─────────────────────────────────────────────┘"
echo ""

if [ "$FAIL" -gt 0 ]; then
  echo -e "❌ Milestone $MILESTONE_ID verification FAILED. Fix the issues above and re-run."
  exit 1
else
  echo -e "✅ Milestone $MILESTONE_ID verification PASSED. Ready to mark complete."
  exit 0
fi
