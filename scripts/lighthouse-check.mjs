import { spawn } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const PREVIEW_URL = process.env.LH_URL ?? 'http://127.0.0.1:4173'
const MIN_SCORE = Number(process.env.LH_MIN_SCORE ?? 85)

function run(commandLine, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(commandLine, { cwd: root, stdio: 'inherit', shell: true, ...opts })
    p.on('exit', (code) => (code === 0 ? resolve(undefined) : reject(new Error(`${commandLine} exited ${code}`))))
  })
}

function fileExists(candidate) {
  try {
    return fs.existsSync(candidate)
  } catch {
    return false
  }
}

async function playwrightChromiumPath() {
  try {
    const { chromium } = await import('@playwright/test')
    const executablePath = chromium.executablePath()
    return fileExists(executablePath) ? executablePath : undefined
  } catch {
    return undefined
  }
}

async function resolveChromePath() {
  const fromEnv = process.env.LH_CHROME_PATH ?? process.env.CHROME_PATH
  if (fromEnv && fileExists(fromEnv)) return fromEnv

  const localAppData = process.env.LOCALAPPDATA ?? path.join(os.homedir(), 'AppData', 'Local')
  const programFiles = process.env.ProgramFiles ?? 'C:\\Program Files'
  const programFilesX86 = process.env['ProgramFiles(x86)'] ?? 'C:\\Program Files (x86)'

  const candidates = []
  if (process.platform === 'win32') {
    candidates.push(
      path.join(programFiles, 'Google', 'Chrome', 'Application', 'chrome.exe'),
      path.join(programFilesX86, 'Google', 'Chrome', 'Application', 'chrome.exe'),
      path.join(localAppData, 'Google', 'Chrome', 'Application', 'chrome.exe'),
      path.join(programFiles, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
      path.join(programFilesX86, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
    )
  } else if (process.platform === 'darwin') {
    candidates.push(
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
    )
  } else {
    candidates.push(
      '/usr/bin/google-chrome-stable',
      '/usr/bin/google-chrome',
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium',
      '/snap/bin/chromium',
    )
  }

  for (const candidate of candidates) {
    if (fileExists(candidate)) return candidate
  }

  return playwrightChromiumPath()
}

async function waitForServer(url, timeoutMs = 90_000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url)
      if (res.ok) return
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error(`Preview server not ready at ${url}`)
}

async function main() {
  const chromePath = await resolveChromePath()
  if (!chromePath) {
    throw new Error(
      'No Chrome, Edge, or Chromium installation found. Install Chrome/Edge, run `npx playwright install chromium`, or set LH_CHROME_PATH.',
    )
  }

  console.log(`Using browser: ${chromePath}`)

  console.log('Building production bundle…')
  await run('npm run build')

  console.log('Starting preview server…')
  const preview = spawn('npm run preview -- --host 127.0.0.1 --port 4173', {
    cwd: root,
    stdio: 'ignore',
    shell: true,
  })

  try {
    await waitForServer(PREVIEW_URL)

    const chrome = await chromeLauncher.launch({
      chromePath,
      chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
    })

    try {
      const result = await lighthouse(PREVIEW_URL, {
        port: chrome.port,
        output: 'json',
        logLevel: 'error',
        onlyCategories: ['performance'],
      })
      const score = Math.round((result?.lhr.categories.performance?.score ?? 0) * 100)
      console.log(`Lighthouse Performance: ${score} (target ≥${MIN_SCORE})`)
      if (score < MIN_SCORE) {
        console.error(`Performance score ${score} is below threshold ${MIN_SCORE}`)
        process.exitCode = 1
      }
    } finally {
      try {
        await chrome.kill()
      } catch (err) {
        console.warn(`Chrome cleanup: ${err instanceof Error ? err.message : err}`)
      }
    }
  } finally {
    try {
      preview.kill('SIGTERM')
    } catch {
      /* ignore */
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
