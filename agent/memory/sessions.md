# Session Memory
# Format: YAML blocks, last 3 loaded per session, auto-compacted at 15 entries
# DO NOT edit manually — updated by /acp-commit

- date: 2026-06-14
  executor: cursor
  branch: main
  tasks_completed:
    - task-49
    - task-50
    - task-51
    - task-52
    - task-53
    - task-54
    - task-55
    - task-56
    - task-57
    - task-58
    - task-59
    - task-60
  done:
    - m7-audit-remediation-v041
    - acp-sync-prd-architecture-user-guide
    - documentation-v041-release-ready
  deferred:
    - npm-publish → manual after npm login
    - visualizer-migration-task-34 → ACPEnhanced-Visual repo
    - git-push-origin-main → 3 commits ahead
  key_fact: "M7 v0.4.1 is release-ready; tsconfig.lib.json scopes vite-plugin-dts to src/; docs/user-guide.md is the canonical end-user doc"

- date: 2026-06-14
  executor: copilot
  branch: main
  tasks_completed:
    - task-39
    - task-40
    - task-41
    - task-42
    - task-43
    - task-44
    - task-45
    - task-46
    - task-47
    - task-48
  done:
    - m3b-audit-remediation-v031
    - embed-theme-contract-adr-007
    - audit-4-carryover-verification
    - prd-readme-architecture-sync
    - progress-yaml-updated
  deferred:
    - git-commit-v031 → AUDIT-004-OP1
    - m6-library-package → task-29
    - m4-folder-browser → task-20
  key_fact: "M3b closed all AUDIT-003 embed bugs; MarkdownViewer embed API is ready for acp-visualizer — only M6 npm publish blocks cutover"
