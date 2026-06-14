import fs from 'node:fs'

let out = fs.readFileSync('agent/progress.yaml', 'utf8')

out = out.replace(/version: 0\.1\.0/, 'version: 0.3.0')
out = out.replace(/current_milestone: M1/, 'current_milestone: M4')

const m1 = `- id: M1
    name: Foundation & Component Port
    priority: 0
    file: agent/milestones/milestone-1-foundation.md
    status: completed
    progress: 100
    started: 2026-06-14
    completed: 2026-06-14
    estimated_weeks: 1
    tasks_completed: 7
    tasks_total: 7`

out = out.replace(
  /- id: M1[\s\S]*?tasks_total: 7[\s\S]*?task-36\) after scaffold\./,
  m1 + '\n    notes: |\n      Phase 0 complete — scaffold, port, CI.',
)

out = out.replace(
  /(- id: M2[\s\S]*?)status: not_started\n    progress: 0\n    started: null\n    completed: null\n    estimated_weeks: 2\n    tasks_completed: 0\n    tasks_total: 8/,
  '$1status: completed\n    progress: 100\n    started: 2026-06-14\n    completed: 2026-06-14\n    estimated_weeks: 2\n    tasks_completed: 8\n    tasks_total: 8',
)

out = out.replace(
  /(- id: M3[\s\S]*?)status: not_started\n    progress: 0\n    started: null\n    completed: null\n    estimated_weeks: 1\n    tasks_completed: 0\n    tasks_total: 7/,
  '$1status: completed\n    progress: 100\n    started: 2026-06-14\n    completed: 2026-06-14\n    estimated_weeks: 1\n    tasks_completed: 7\n    tasks_total: 7',
)

let inM123 = false
out = out
  .split('\n')
  .map((line) => {
    if (/^  milestone_[123]:/.test(line)) inM123 = true
    if (/^  milestone_[456]:/.test(line)) inM123 = false
    if (inM123) {
      line = line.replace('status: not_started', 'status: completed')
      line = line.replace('started: null', 'started: 2026-06-14T00:00:00Z')
      line = line.replace('completed_date: null', 'completed_date: 2026-06-14T13:30:00Z')
    }
    return line
  })
  .join('\n')

out = out.replace(/  implementation: 0/, '  implementation: 55')
out = out.replace(/  testing: 0/, '  testing: 60')
out = out.replace(/  overall: 15/, '  overall: 55')

out = out.replace(
  /current_task:[\s\S]*?status: not_started/,
  `current_task:
  id: task-20
  name: Folder Browser
  file: agent/tasks/milestone-4-enhanced/task-20-folder-browser.md
  status: not_started`,
)

fs.writeFileSync('agent/progress.yaml', out)
console.log('progress.yaml updated')
