import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const PREVIEW_URL = process.env.LH_URL ?? 'http://127.0.0.1:4173'
const MIN_SCORE = Number(process.env.LH_MIN_SCORE ?? 85)

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { cwd: root, stdio: 'inherit', shell: true, ...opts })
    p.on('exit', (code) => (code === 0 ? resolve(undefined) : reject(new Error(`${cmd} exited ${code}`))))
  })
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
  console.log('Building production bundle…')
  await run('npm', ['run', 'build'])

  console.log('Starting preview server…')
  const preview = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173'], {
    cwd: root,
    stdio: 'ignore',
    shell: true,
  })

  try {
    await waitForServer(PREVIEW_URL)

    const chrome = await chromeLauncher.launch({
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
      await chrome.kill()
    }
  } finally {
    preview.kill('SIGTERM')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
