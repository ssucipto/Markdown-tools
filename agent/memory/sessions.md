# Session Memory
# Format: YAML blocks, last 3 loaded per session, auto-compacted at 15 entries
# DO NOT edit manually — updated by /acp-commit

- date: 2026-06-14
  executor: cursor
  branch: main
  tasks_completed: []
  done:
    - audit-6-visualizer-migration-guide
    - visualizer-migration-comprehensive-rewrite
    - embed-api-task34-carryovers-synced
  deferred:
    - git-commit-audit-6-docs → visualizer-migration, embed-api, task-34, carryovers uncommitted
    - npm-publish → blocks visualizer Option A install (AUDIT-006-B1)
    - fr-7-8-visualizer-cutover → ACPEnhanced-Visual repo (AUDIT-006-B2)
  key_fact: "Visualizer keeps listDocs/readDoc; @markdown-tools/react is render-only plugin — DocsViewerEmbed must sync documentPath on sidebar click and wire theme via ADR-007"

- date: 2026-06-14
  executor: cursor
  branch: main
  tasks_completed: []
  done:
    - acp-sync-comprehensive-run-install-docs
    - readme-user-guide-desktop-cli-from-anywhere
    - architecture-embed-api-changelog-synced
  deferred:
    - git-commit-docs-sync → 7 files uncommitted
    - npm-publish → manual after npm login
    - visualizer-migration-task-34 → ACPEnhanced-Visual repo
    - tauri-build → requires Rust toolchain on developer machine
  key_fact: "docs/user-guide.md and README How to run are canonical for web, CLI, and desktop; Rust+cargo only needed for tauri:build/tauri:dev"

- date: 2026-06-14
  executor: cursor
  branch: main
  tasks_completed: []
  done:
    - e2e-fix-controlled-content-bug
    - e2e-test-selector-and-locator-updates
    - full-test-suite-verified-9-e2e-pass
  deferred:
    - git-commit-e2e-fix → uncommitted working tree
    - npm-publish → manual after npm login
    - visualizer-migration-task-34 → ACPEnhanced-Visual repo
  key_fact: "StandaloneViewer must pass content/rawMarkdown as undefined until documentPath is set; empty string triggers isControlled and blocks the file picker in MarkdownViewer"

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
