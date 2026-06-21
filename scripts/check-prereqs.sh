#!/usr/bin/env bash
# ACP Prerequisite Checker
# Checks that all required tooling is installed for building and running Markdown-tools
# Usage: bash scripts/check-prereqs.sh
# Exit code: 0 if all checks pass, 1 if any check fails

set -euo pipefail
trap 'echo "❌ Script failed unexpectedly at line $LINENO"' ERR

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color
PASS=0
FAIL=0

check() {
  local name="$1"
  local command="$2"
  local url="$3"
  if eval "$command" >/dev/null 2>&1; then
    echo -e "  ${GREEN}✓${NC} $name"
    PASS=$((PASS + 1))
  else
    echo -e "  ${RED}✗${NC} $name — install from: $url"
    FAIL=$((FAIL + 1))
  fi
}

echo ""
echo "┌─────────────────────────────────────────────┐"
echo "│  Markdown-tools — Prerequisite Checker      │"
echo "└─────────────────────────────────────────────┘"
echo ""

# ── Node.js & npm ──
echo "📦 Node.js & npm"
check "node >= 20"       'node --version 2>&1 | grep -qE "^v(2[0-9]|[3-9][0-9])"'  "https://nodejs.org/"
check "npm works"        'npm --version'                                             "(bundled with Node.js)"
echo ""

# ── Project dependencies ──
echo "📁 Project dependencies"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
if [ -d "$PROJECT_DIR/node_modules" ]; then
  echo -e "  ${GREEN}✓${NC} node_modules/ exists (run npm install)"
else
  echo -e "  ${RED}✗${NC} node_modules/ missing — run: npm install"
  FAIL=$((FAIL + 1))
fi
echo ""

# ── Rust toolchain ──
echo "🦀 Rust toolchain (required for desktop build only)"
check "cargo"            'cargo --version'       "https://rustup.rs/"
check "rustc"            'rustc --version'       "https://rustup.rs/"
echo ""

# ── Platform-specific ──
case "$(uname -s)" in
  Darwin)
    echo "🍎 macOS"
    check "Xcode CLI tools" 'xcode-select -p'    "xcode-select --install"
    echo ""
    ;;
  Linux)
    echo "🐧 Linux"
    check "pkg-config"      'pkg-config --version' "apt install pkg-config / pacman -S pkg-config"
    check "webkit2gtk-4.1"  'pkg-config --exists webkit2gtk-4.1' "https://v2.tauri.app/start/prerequisites/"
    echo ""
    ;;
  *)
    echo "💻 Windows (detected via uname: $(uname -s))"
    echo -e "  ${YELLOW}⚠${NC} Platform-specific checks skipped for non-macOS/Linux"
    echo -e "  ${YELLOW}⚠${NC} See: https://v2.tauri.app/start/prerequisites/"
    echo ""
    ;;
esac

# ── Summary ──
echo "┌─────────────────────────────────────────────┐"
echo "│  Summary                                    │"
echo "├─────────────────────────────────────────────┤"
printf "│  ${GREEN}%-2d passed${NC} / ${RED}%-2d failed${NC}                        │\n" "$PASS" "$FAIL"
echo "└─────────────────────────────────────────────┘"
echo ""

if [ "$FAIL" -gt 0 ]; then
  echo -e "❌ ${FAIL} prerequisite(s) missing. Please install them and re-run this check."
  exit 1
else
  echo -e "✅ All prerequisites met!"
  exit 0
fi
