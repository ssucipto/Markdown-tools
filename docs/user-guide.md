# Markdown-tools User Guide

**Version**: 0.4.1  
**Audience**: End users, contributors, and anyone running the viewer locally

Markdown-tools is a **desktop-first markdown viewer**. Open files locally, preview rich formatting (Mermaid diagrams, KaTeX math), and export to Word, DOCX, or PDF. Nothing is uploaded to a server.

---

## Table of contents

1. [Prerequisites](#prerequisites)
2. [Choose how to run](#choose-how-to-run)
3. [First-time setup](#first-time-setup)
4. [Web app (browser)](#web-app-browser)
5. [Running from anywhere](#running-from-anywhere)
6. [Desktop app (Tauri)](#desktop-app-tauri)
7. [CLI reference](#cli-reference)
8. [Opening documents](#opening-documents)
9. [Reading and navigation](#reading-and-navigation)
10. [Mermaid diagrams](#mermaid-diagrams)
11. [Math (KaTeX)](#math-katex)
12. [Exporting documents](#exporting-documents)
13. [View source mode](#view-source-mode)
14. [Sample documents](#sample-documents)
15. [Verifying your install (developers)](#verifying-your-install-developers)
16. [Troubleshooting](#troubleshooting)
17. [Privacy and security](#privacy-and-security)

---

## Prerequisites

### Required for the web app

| Requirement | Notes |
|-------------|--------|
| **Node.js** 20+ | [nodejs.org](https://nodejs.org/) — includes `npm` |
| **Git** | To clone the repository |
| **Modern browser** | Chrome/Edge 120+, Firefox 120+, or Safari 17+ |

### Additional requirements for the desktop app

| Requirement | Notes |
|-------------|--------|
| **Rust (stable)** | Install via [rustup.rs](https://rustup.rs/) — provides `cargo` and `rustc` |
| **Windows**: MSVC build tools | Visual Studio Build Tools with **Desktop development with C++** ([Tauri prerequisites](https://v2.tauri.app/start/prerequisites/)) |
| **macOS**: Xcode CLI tools | `xcode-select --install` |
| **Linux**: webkit2gtk, etc. | See [Tauri Linux deps](https://v2.tauri.app/start/prerequisites/) |

After installing Rust, **restart your terminal** and verify:

```bash
cargo --version
rustc --version
```

If you see `program not found` when running `npm run tauri:build`, Rust is missing or not on your `PATH`.

---

## Choose how to run

| Goal | What to use | Needs Rust? |
|------|-------------|-------------|
| Quick preview in a browser | `npm run dev` | No |
| Production-like local server | `npm run build` + `npm run preview` | No |
| Run dev server from any folder | `npm link` → `markdown-tools dev` | No |
| Native window + `.md` file associations | `npm run tauri:build` → install `.msi` / `.dmg` | **Yes** |
| Open one file in desktop dev shell | `markdown-tools open file.md` | **Yes** |
| Embed in another React app | `npm install @markdown-tools/react` | No |

**Recommendation**: Start with the **web app** (`npm run dev`). Build the **desktop installer** only when you want double-click `.md` support or a standalone app without a browser tab.

---

## First-time setup

```bash
git clone https://github.com/ssucipto/markdown-tools.git
cd markdown-tools
npm install
```

This installs dependencies once. You do not need to repeat `npm install` unless `package.json` changes.

---

## Web app (browser)

### Development server (hot reload)

```bash
npm run dev
```

Open **http://localhost:5173**.

- Drop any `.md` file onto the page, or use **📂** / **📁** in the toolbar.
- Files can live **anywhere on disk** — the app reads them locally; only the dev server runs from the project folder.

### Production preview

```bash
npm run build
npm run preview
```

Open **http://localhost:4173**. This matches what Playwright E2E tests use.

### Stopping the server

Press `Ctrl+C` in the terminal where the server is running.

---

## Running from anywhere

You do **not** need to `cd` into the project every time if you link or install the CLI.

### Option A — `npm link` (local development)

Run once from the project clone:

```bash
cd path/to/markdown-tools
npm install
npm link
```

Then from **any directory**:

```bash
markdown-tools dev
# → starts Vite at http://localhost:5173

markdown-tools open C:\Users\you\notes\readme.md
# → opens file in Tauri dev (requires Rust)
```

`markdown-tools dev` always uses your linked clone as the app root. You can open markdown files from any path via drag-and-drop, **📂**, or `open`.

### Option B — `npx` from the project path

Without linking, from any folder:

```bash
npx --prefix C:\Project\Markdown-tools markdown-tools dev
```

### Option C — global install (after `npm publish`)

When `@markdown-tools/react` is published to npm:

```bash
npm install -g @markdown-tools/react
markdown-tools dev
markdown-tools open path\to\file.md
```

### What “from anywhere” means

| Action | Works from any folder? |
|--------|------------------------|
| Start dev server (`markdown-tools dev`) | Yes, after `npm link` or global install |
| Open a specific file (`markdown-tools open`) | Yes — path is resolved from your current directory or absolute path |
| Pick files via **📂** / drag-and-drop | Yes — once the app is running, files can be anywhere on disk |
| Build desktop installer | No — run `npm run tauri:build` from the project clone |

There is **no** CLI command today to open a file in the **browser** without starting the server first. Workflow: start `dev`, then pick or drop the file.

---

## Desktop app (Tauri)

The desktop build wraps the same viewer in a native window, registers **`.md` / `.markdown` file associations**, and supports **single-instance** (opening a second file focuses the existing window).

### Development (hot reload)

Requires Rust + platform build tools (see [Prerequisites](#prerequisites)).

```bash
npm run tauri:dev
```

A native window opens. The Vite dev server runs in the background at `http://localhost:5173`.

### Production installer

```bash
npm run tauri:build
```

This runs `npm run build` first, then compiles the Rust shell. First build may take **10–20+ minutes** while dependencies compile.

**Installer output** (typical paths):

| Platform | Output |
|----------|--------|
| Windows | `src-tauri/target/release/bundle/msi/Markdown Tools_0.4.1_x64_en-US.msi` |
| macOS | `src-tauri/target/release/bundle/dmg/` |
| Linux | `src-tauri/target/release/bundle/deb/` or `appimage/` |

Run the installer, then:

- **Double-click** any `.md` file in Explorer/Finder
- Or use **Open with** → **Markdown Tools**

If the app is already running, a new file open is forwarded to the existing window.

### Desktop vs browser

| Feature | Browser (`npm run dev`) | Desktop (Tauri) |
|---------|-------------------------|-----------------|
| File picker / drag-drop | ✅ | ✅ |
| Folder browser | ✅ | ✅ |
| Mermaid / KaTeX / export | ✅ | ✅ |
| Double-click `.md` in OS | ❌ | ✅ |
| Single-instance file open | ❌ | ✅ |
| Needs Node running | ✅ (dev server) | ❌ (after install) |

---

## CLI reference

The `markdown-tools` binary ships with the package (`bin/markdown-tools.mjs`).

```bash
markdown-tools --help
```

| Command | Description |
|---------|-------------|
| `markdown-tools dev` | Start Vite dev server (`npm run dev` in package root) |
| `markdown-tools open <file.md>` | Open a markdown file in Tauri dev shell |

**Examples:**

```bash
# Relative path (resolved from current directory)
markdown-tools open ./docs/sample-basic.md

# Absolute path (Windows)
markdown-tools open C:\Project\Markdown-tools\README.md

# Git Bash on Windows
markdown-tools open /c/Users/you/notes/todo.md
```

`open` requires Rust and runs `tauri dev` under the hood. Use `dev` alone if you only want the browser UI.

---

## Opening documents

### Drag and drop

Drag a `.md` or `.markdown` file onto the window. A dashed overlay appears while dragging. Release to render.

Only markdown files are accepted. Other file types show a toast: **Only .md files are supported**.

### Single file picker (📂)

Click the **📂** button in the bottom-right toolbar to choose one file from your computer.

### Folder browser (📁)

Click **📁** to open a folder of markdown files:

- **Chrome / Edge**: Native folder picker (File System Access API).
- **Firefox / Safari**: Folder selection via fallback picker (`webkitdirectory`).

When a folder is loaded, a **sidebar** lists all `.md` files. Click a file to preview it.

### Desktop file association

With the Tauri installer, open `.md` files from Explorer/Finder or pass a path on the command line (`markdown-tools open`).

---

## Reading and navigation

### Table of contents

When headings are present, a **TOC panel** appears on the right. Click a heading to jump to that section. The active section highlights as you scroll.

### Theme (🌙 / ☀️)

Toggle **dark** and **light** mode. Mermaid diagrams re-render to match the theme.

### Font size (S / M / L)

Cycle through small, medium, and large text sizes.

### Fullscreen (⛶)

Enter distraction-free fullscreen. Press again to exit.

### Back to top (↑)

Smooth-scroll to the top of the document.

### Images

Click any image in the document to open a **lightbox** for a larger view.

### Code blocks

Each fenced code block shows its language and a **Copy** button. Click Copy to put the code on your clipboard.

---

## Mermaid diagrams

Fenced blocks tagged `mermaid` render as interactive diagrams.

### Zoom

Click a diagram to open the **Mermaid lightbox** with pan and zoom.

### Copy and download

Rendered diagrams include toolbar actions to:

- **Copy** the Mermaid source text
- **Download** the diagram as SVG

If a diagram fails to render, the raw source is shown with an error state.

Try [sample-mermaid.md](sample-mermaid.md) for examples.

---

## Math (KaTeX)

Inline math: `$E = mc^2$`  
Block math:

```markdown
$$
\int_0^1 x^2 \, dx
$$
```

Math inside **fenced code blocks** is not transformed — only prose math is rendered.

Try [sample-math.md](sample-math.md).

**Export note**: DOCX export shows math as `[math]` text placeholders; Word HTML export includes rendered KaTeX HTML where supported.

---

## Exporting documents

Use the toolbar buttons at the bottom-right. Exports use the **rendered** view (not view-source mode).

| Button | Format | Notes |
|--------|--------|-------|
| **W** | `.docx` | True Word document (headings, tables, code, diagrams as images) |
| **.doc** | `.doc` | HTML-based Word format (legacy fallback) |
| **📄** | PDF | Opens browser print dialog — allow popups |

### Tips for reliable export

1. Wait for Mermaid diagrams to finish rendering before exporting.
2. Allow popups for PDF export.
3. Switch back from **view source** mode before exporting (export buttons are disabled in source mode).
4. Large documents may take a few seconds while diagrams are rasterized.

Try [sample-export-torture.md](sample-export-torture.md) for a stress test.

---

## View source mode

Click **`</>`** in the toolbar to toggle **view source** — a read-only panel showing the raw markdown text.

- Useful for debugging rendering or copying source.
- Export buttons are **disabled** in this mode; switch back to rendered view to export.

---

## Sample documents

| File | What it demonstrates |
|------|----------------------|
| [sample-basic.md](sample-basic.md) | Headings, lists, links |
| [sample-gfm.md](sample-gfm.md) | GFM tables, task lists, strikethrough |
| [sample-code.md](sample-code.md) | Syntax-highlighted code blocks |
| [sample-mermaid.md](sample-mermaid.md) | Flowchart, sequence, class diagrams |
| [sample-math.md](sample-math.md) | KaTeX inline and block math |
| [sample-export-torture.md](sample-export-torture.md) | Export QA — tables + multiple diagrams |

Load any sample via **📂** after starting the dev server.

---

## Verifying your install (developers)

Full quality gate (same as CI):

```bash
npm install          # first time only
npm test             # Vitest — unit + contract tests
npm run test:e2e     # Playwright — 9 browser tests
npm run typecheck
npm run lint
npm run build        # SPA production build
npm run build:lib    # npm library build
npm pack --dry-run   # verify publish tarball
```

**E2E tip**: If port `4173` is already in use from a previous preview server, either stop that process or force a fresh build:

```bash
CI=true npm run test:e2e
```

On Windows PowerShell, free port 4173:

```powershell
Get-NetTCPConnection -LocalPort 4173 -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty OwningProcess -Unique |
  ForEach-Object { Stop-Process -Id $_ -Force }
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `cargo metadata` / `program not found` | Install Rust from [rustup.rs](https://rustup.rs/), restart terminal, install MSVC build tools on Windows. |
| `tauri:build` very slow first time | Normal — Rust compiles many crates once; later builds are faster. |
| Dev server won’t start (port in use) | Another `vite` or `preview` may be running; stop it or change port in `vite.config.ts`. |
| File picker does nothing | Ensure you use **📂** (single file), not the hidden folder input. Update to v0.4.1+ if using standalone mode. |
| Folder button missing | Use Chrome/Edge or Firefox/Safari; ensure standalone app (not embed-only). |
| Mermaid diagram blank | Check syntax at [mermaid.live](https://mermaid.live). Wait up to 25s on slow machines. |
| PDF export does nothing | Allow popups; check for blocked print window. |
| Export shows raw markdown | Exit view-source mode (`</>` toggle). |
| DOCX missing diagram | Wait for Mermaid to render; large SVGs may time out (5s limit). |
| `markdown-tools` command not found | Run `npm link` from project root, or use `npx markdown-tools dev` from project dir. |
| E2E tests fail locally but pass in CI | Run `CI=true npm run test:e2e` to rebuild and use a fresh preview server. |
| KaTeX not styled (embed) | Import `@markdown-tools/react/styles.css` in your host app. |

---

## Privacy and security

- **No upload**: File content never leaves your machine unless you export or print.
- **Sanitization**: Parsed HTML is sanitized with DOMPurify before display.
- **Local trust model**: You open your own files; treat untrusted markdown like untrusted web content.

For developers embedding the viewer, see [embed-api.md](embed-api.md).  
For library integration with ACPEnhanced-Visual, see [visualizer-migration.md](visualizer-migration.md).  
Project overview and CI commands: [README.md](../README.md).
