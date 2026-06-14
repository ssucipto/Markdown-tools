#!/usr/bin/env node
/**
 * CLI entry: open a markdown file in the desktop app (Tauri) or dev server.
 * Usage: markdown-tools open path/to/file.md
 */
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const [, , command, fileArg] = process.argv

function usage() {
  console.log(`markdown-tools — Markdown viewer CLI

Usage:
  markdown-tools open <file.md>   Open file in desktop app (Tauri)
  markdown-tools dev              Start Vite dev server
`)
}

if (!command || command === '--help' || command === '-h') {
  usage()
  process.exit(0)
}

if (command === 'dev') {
  const p = spawn('npm', ['run', 'dev'], { cwd: root, stdio: 'inherit', shell: true })
  p.on('exit', (code) => process.exit(code ?? 0))
} else if (command === 'open') {
  if (!fileArg) {
    console.error('Error: provide a .md file path')
    usage()
    process.exit(1)
  }
  const resolved = path.resolve(fileArg)
  if (!fs.existsSync(resolved)) {
    console.error(`Error: file not found: ${resolved}`)
    process.exit(1)
  }
  const p = spawn('npx', ['tauri', 'dev', '--', resolved], {
    cwd: root,
    stdio: 'inherit',
    shell: true,
  })
  p.on('exit', (code) => process.exit(code ?? 0))
} else {
  console.error(`Unknown command: ${command}`)
  usage()
  process.exit(1)
}
