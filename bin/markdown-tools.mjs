#!/usr/bin/env node
/**
 * CLI entry: open a markdown file in the desktop app (Tauri) or dev server.
 * Usage: markdown-tools open path/to/file.md
 *
 * Modes:
 *   - If a production Tauri binary exists, launch it directly.
 *   - If only Tauri dev environment is available, fall back to `tauri dev`.
 *   - If Rust is missing entirely, print a clear error.
 */
import { spawn, execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const [, , command, fileArg] = process.argv

// ── Helpers ────────────────────────────────────────────────────────────

function usage() {
  console.log(`markdown-tools — Markdown viewer CLI

Usage:
  markdown-tools open <file.md>   Open file in desktop app (Tauri)
  markdown-tools dev              Start Vite dev server
  markdown-tools --help           Show this help

Modes:
  Production binary  (fastest)    After running 'npm run tauri:build'
  Tauri dev shell    (dev only)   Fallback when no built binary found
  Browser only                    Use 'markdown-tools dev' instead
`)
}

function findBuiltBinary() {
  // macOS/Linux
  const binaryName = process.platform === 'win32' ? 'app.exe' : 'app'
  const releasePath = path.join(root, 'src-tauri', 'target', 'release', binaryName)
  if (fs.existsSync(releasePath)) return releasePath

  // Also check PATH for a globally installed 'markdown-tools' binary
  const envPath = process.env.PATH || ''
  const dirs = envPath.split(path.delimiter)
  for (const dir of dirs) {
    const candidate = path.join(dir, 'markdown-tools')
    if (fs.existsSync(candidate)) return candidate
  }

  return null
}

function isRustAvailable() {
  try {
    execSync('cargo --version', { stdio: 'pipe', timeout: 5000 })
    return true
  } catch {
    return false
  }
}

function isTauriCliAvailable() {
  const tauriBin = path.join(root, 'node_modules', '.bin', 'tauri')
  return fs.existsSync(tauriBin)
}

function sanitizePath(input) {
  // Basic shell injection prevention: reject characters that could escape arguments
  // eslint-disable-next-line no-control-regex
  if (/[;&|`$(){}[\]!#~<>]/u.test(input)) {
    throw new Error('File path contains unsafe characters')
  }
  return input
}

// ── Command handlers ───────────────────────────────────────────────────

function handleDev() {
  const p = spawn('npm', ['run', 'dev'], { cwd: root, stdio: 'inherit', shell: true })
  p.on('exit', (code) => process.exit(code ?? 0))
}

function handleOpen(filePath) {
  if (!filePath) {
    console.error('Error: provide a .md file path')
    usage()
    process.exit(1)
  }

  // Validate and resolve path
  let resolved
  try {
    sanitizePath(filePath) // throws on unsafe chars
    resolved = path.resolve(filePath)
  } catch (e) {
    console.error(`Error: ${e.message}`)
    process.exit(1)
  }

  if (!fs.existsSync(resolved)) {
    console.error(`Error: file not found: ${resolved}`)
    process.exit(1)
  }

  // Strategy 1: Launch built binary directly
  const binary = findBuiltBinary()
  if (binary) {
    console.log(`Launching desktop app with: ${resolved}`)
    const p = spawn(binary, [resolved], { stdio: 'inherit', shell: false })
    p.on('exit', (code) => process.exit(code ?? 0))
    return
  }

  // Strategy 2: Fall back to Tauri dev shell (requires Rust)
  if (isRustAvailable() && isTauriCliAvailable()) {
    console.log('No built binary found. Starting Tauri dev shell...')
    const tauriBin = path.join(root, 'node_modules', '.bin', 'tauri')
    const p = spawn(tauriBin, ['dev', '--', resolved], {
      cwd: root,
      stdio: 'inherit',
      shell: false,
    })
    p.on('exit', (code) => process.exit(code ?? 0))
    return
  }

  // Strategy 3: Give a clear error
  const missingRust = !isRustAvailable()
  const missingTauri = !isTauriCliAvailable()

  console.error(`Error: Desktop app not available.

${missingRust ? '  - Rust (cargo) is not installed.' : ''}
${missingTauri ? '  - Tauri CLI is not installed (run npm install).' : ''}
${!missingRust && !missingTauri ? '  - No built binary found.' : ''}

To use the desktop app:
${missingRust ? '  1. Install Rust:        https://rustup.rs/' : ''}
${missingTauri ? '  1. Install deps:        npm install' : ''}
${!missingRust && !missingTauri ? '  1. Build desktop app:  npm run tauri:build' : ''}
${!missingRust && missingTauri ? '  2. Then build:          npm run tauri:build' : ''}
${missingRust && !missingTauri ? '  2. Then build:          npm run tauri:build' : ''}
  ${!missingRust && !missingTauri ? '2. Then try again:     markdown-tools open "' + filePath + '"' : ''}

Or use the browser version:
  markdown-tools dev
`)
  process.exit(1)
}

// ── Main ───────────────────────────────────────────────────────────────

if (!command || command === '--help' || command === '-h') {
  usage()
  process.exit(0)
}

if (command === 'dev') {
  handleDev()
} else if (command === 'open') {
  handleOpen(fileArg)
} else {
  console.error(`Unknown command: ${command}`)
  usage()
  process.exit(1)
}
