# Markdown-tools User Guide

**Version**: 0.4.1  
**Audience**: End users — authors, readers, and teams working with `.md` files

Markdown-tools is a **desktop-first markdown viewer**. Open files locally, preview rich formatting (including Mermaid diagrams and KaTeX math), and export to Word, DOCX, or PDF. Nothing is uploaded to a server.

---

## Table of contents

1. [Installation](#installation)
2. [Opening documents](#opening-documents)
3. [Reading and navigation](#reading-and-navigation)
4. [Mermaid diagrams](#mermaid-diagrams)
5. [Math (KaTeX)](#math-katex)
6. [Exporting documents](#exporting-documents)
7. [View source mode](#view-source-mode)
8. [Sample documents](#sample-documents)
9. [Troubleshooting](#troubleshooting)
10. [Privacy and security](#privacy-and-security)

---

## Installation

### Web app (recommended for daily use)

```bash
git clone <repo-url> markdown-tools
cd markdown-tools
npm install
npm run dev
```

Open **http://localhost:5173** in Chrome, Edge, or Firefox.

For a production build served locally:

```bash
npm run build
npm run preview
```

### Desktop app (Tauri)

Requires [Rust](https://rustup.rs/) and platform build tools.

```bash
npm install
npm run tauri:dev      # Development with hot reload
npm run tauri:build    # Native installer (.msi / .dmg / .deb)
```

On Windows, after install, double-click a `.md` file to open it in Markdown-tools. If the app is already running, the file opens in the existing window (single-instance).

### CLI

After `npm install`, use the `markdown-tools` command:

```bash
markdown-tools open path/to/document.md   # Open in Tauri dev shell
markdown-tools dev                        # Start Vite dev server
```

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

With the Tauri build installed, open `.md` files from Explorer/Finder or pass a path on the command line.

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

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Folder button missing | Use Chrome/Edge or Firefox/Safari with latest version; ensure you use the standalone app (not embed-only mode). |
| Mermaid diagram blank | Check syntax at [mermaid.live](https://mermaid.live). Invalid diagrams show fallback text. |
| PDF export does nothing | Allow popups for this site; check for a blocked print window. |
| Export shows raw markdown | Exit view-source mode (`</>` toggle). |
| DOCX missing diagram | Wait for Mermaid to render; very large SVGs may time out (5s limit). |
| Tauri won't build | Install Rust toolchain: `rustup.rs`. Run `npm run tauri:dev` first. |
| KaTeX not styled (embed) | Import `@markdown-tools/react/styles.css` in your host app. |

---

## Privacy and security

- **No upload**: File content never leaves your machine unless you export or print.
- **Sanitization**: Parsed HTML is sanitized with DOMPurify before display.
- **Local trust model**: You open your own files; treat untrusted markdown like untrusted web content.

For developers embedding the viewer, see [embed-api.md](embed-api.md).
