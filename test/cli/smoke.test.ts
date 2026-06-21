import { describe, it, expect } from 'vitest'
import { execSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const cliPath = path.resolve(__dirname, '../../bin/markdown-tools.mjs')
const sampleDoc = path.resolve(__dirname, '../../docs/sample-basic.md')

/** Helper: run the CLI and return { stdout, stderr, code } */
function runCli(args: string[], timeout = 10000): { stdout: string; stderr: string; code: number } {
  try {
    const output = execSync(`node "${cliPath}" ${args.join(' ')}`, {
      encoding: 'utf-8',
      timeout,
      stdio: 'pipe',
    })
    return { stdout: output.trim(), stderr: '', code: 0 }
  } catch (e: unknown) {
    const err = e as { stdout?: string; stderr?: string; status?: number }
    return {
      stdout: (err.stdout ?? '').toString().trim(),
      stderr: (err.stderr ?? '').toString().trim(),
      code: err.status ?? 1,
    }
  }
}

describe('CLI — markdown-tools.mjs', () => {
  it('--help shows usage', () => {
    const result = runCli(['--help'])
    expect(result.code).toBe(0)
    expect(result.stdout).toContain('markdown-tools')
    expect(result.stdout).toContain('open')
    expect(result.stdout).toContain('dev')
  })

  it('-h shows usage', () => {
    const result = runCli(['-h'])
    expect(result.code).toBe(0)
    expect(result.stdout).toContain('markdown-tools')
  })

  it('no arguments shows usage', () => {
    const result = runCli([])
    expect(result.code).toBe(0)
    expect(result.stdout).toContain('markdown-tools')
  })

  it('open with non-existent file shows error', () => {
    const result = runCli(['open', '/nonexistent/path.md'])
    expect(result.code).toBe(1)
    expect(result.stderr + result.stdout).toContain('Error')
  })

  it('open without file argument shows error', () => {
    const result = runCli(['open'])
    expect(result.code).toBe(1)
    expect(result.stderr + result.stdout).toContain('Error')
  })

  it('open with existing file detects Rust and tries Tauri dev', () => {
    // Use a short timeout so execSync throws quickly if tauri dev hangs
    const result = runCli(['open', sampleDoc], 3000)
    const output = result.stderr + result.stdout
    if (output.includes('Desktop app not available')) {
      // Rust not available — falls through to error message
      expect(result.code).toBe(1)
    } else if (output.includes('Starting Tauri dev shell')) {
      // Rust available — tauri dev started (process may time out, that's OK)
      expect(result.code === 0 || result.code === 1).toBe(true)
    } else {
      // Unexpected output — fail with details
      expect(output).toContain('Starting Tauri dev shell')
    }
  })

  it('unknown command shows error', () => {
    const result = runCli(['foobar'])
    expect(result.code).toBe(1)
    expect(result.stderr + result.stdout).toContain('Unknown command')
  })

  it('usage shows dev command', () => {
    const result = runCli(['--help'])
    expect(result.stdout).toContain('dev')
    expect(result.stdout).toContain('Start Vite dev server')
  })
})
