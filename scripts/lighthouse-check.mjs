import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(fileURLToPath(import.meta.url))

function run(cmd: string, args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const p = spawn(cmd, args, { cwd: path.join(root, '..'), stdio: 'inherit', shell: true })
    p.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`))))
  })
}

async function main() {
  console.log('Lighthouse perf check — build + preview required')
  console.log('Run manually: npm run build && npm run preview')
  console.log('Then: npx lighthouse http://localhost:4173 --only-categories=performance --quiet')
  console.log('Target: Performance score >= 85 (PRD)')
  process.exit(0)
}

main()
