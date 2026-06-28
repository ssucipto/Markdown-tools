import { test, expect } from '@playwright/test'
import path from 'node:path'

const basicDoc = path.join(process.cwd(), 'docs', 'sample-basic.md')
const mermaidDoc = path.join(process.cwd(), 'docs', 'sample-mermaid.md')

test.beforeEach(async ({ page }) => {
  // Force anchor-download fallback — showSaveFilePicker hangs headless Chromium.
  await page.addInitScript(() => {
    delete (window as Window & { showSaveFilePicker?: unknown }).showSaveFilePicker
  })
})

function filePicker(page: import('@playwright/test').Page) {
  return page.getByTestId('file-picker-input').first()
}

test('empty state visible', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText(/Drop a/i)).toBeVisible()
})

test('file picker loads markdown', async ({ page }) => {
  await page.goto('/')
  await filePicker(page).setInputFiles(basicDoc)
  await expect(page.getByRole('heading', { name: 'Sample Basic' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Intro' })).toBeVisible()
})

test('mermaid document renders diagram', async ({ page }) => {
  await page.goto('/')
  await filePicker(page).setInputFiles(mermaidDoc)
  await expect(page.getByLabel('Export to Word')).toBeVisible()
  await expect(page.locator('main article .mermaid-container svg').first()).toBeVisible({ timeout: 25_000 })
})

test('invalid file shows toast', async ({ page }) => {
  await page.goto('/')
  const txtPath = path.join(process.cwd(), 'package.json')
  await filePicker(page).setInputFiles(txtPath)
  await expect(page.getByRole('status')).toContainText(/Only .md files/i)
})

test('view source toggle shows raw markdown', async ({ page }) => {
  await page.goto('/')
  await filePicker(page).setInputFiles(basicDoc)
  await expect(page.getByRole('heading', { name: 'Sample Basic' })).toBeVisible()
  await page.getByLabel('View markdown source').click()
  await expect(page.getByLabel('Markdown source')).toContainText('# Sample Basic')
  await expect(page.getByLabel('Export to DOCX')).toBeDisabled()
})

test('export docx downloads file', async ({ page }) => {
  await page.goto('/')
  await filePicker(page).setInputFiles(basicDoc)
  await expect(page.getByRole('heading', { name: 'Sample Basic' })).toBeVisible()
  const downloadPromise = page.waitForEvent('download')
  await page.getByLabel('Export to DOCX').click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toMatch(/\.docx$/)
})

test('export pdf invokes print without popup', async ({ page }) => {
  await page.goto('/')
  await filePicker(page).setInputFiles(basicDoc)
  await expect(page.getByRole('heading', { name: 'Sample Basic' })).toBeVisible()
  await page.evaluate(() => {
    window.print = () => {}
  })
  await page.getByLabel('Export to PDF').click()
  await expect(page.getByRole('status')).toContainText(/PDF|Print dialog/i)
})
