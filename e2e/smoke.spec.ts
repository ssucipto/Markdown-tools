import { test, expect } from '@playwright/test'
import path from 'node:path'

const basicDoc = path.join(process.cwd(), 'docs', 'sample-basic.md')
const mermaidDoc = path.join(process.cwd(), 'docs', 'sample-mermaid.md')

test('empty state visible', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText(/Drop a/i)).toBeVisible()
})

test('file picker loads markdown', async ({ page }) => {
  await page.goto('/')
  await page.locator('input[type="file"]').setInputFiles(basicDoc)
  await expect(page.getByRole('heading', { name: 'Sample Basic' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Intro' })).toBeVisible()
})

test('mermaid document renders diagram', async ({ page }) => {
  await page.goto('/')
  await page.locator('input[type="file"]').setInputFiles(mermaidDoc)
  await expect(page.getByLabel('Export to Word')).toBeVisible()
  await expect(page.locator('.mermaid-container svg').first()).toBeVisible({ timeout: 25_000 })
})

test('invalid file shows toast', async ({ page }) => {
  await page.goto('/')
  const txtPath = path.join(process.cwd(), 'package.json')
  await page.locator('input[type="file"]').setInputFiles(txtPath)
  await expect(page.getByRole('status')).toContainText(/Only .md files/i)
})

test('export word downloads document', async ({ page }) => {
  await page.goto('/')
  await page.locator('input[type="file"]').setInputFiles(basicDoc)
  await expect(page.getByRole('heading', { name: 'Sample Basic' })).toBeVisible()
  const downloadPromise = page.waitForEvent('download')
  await page.getByLabel('Export to Word').click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toMatch(/\.doc$/)
})

test('view source toggle shows raw markdown', async ({ page }) => {
  await page.goto('/')
  await page.locator('input[type="file"]').setInputFiles(basicDoc)
  await expect(page.getByRole('heading', { name: 'Sample Basic' })).toBeVisible()
  await page.getByLabel('View markdown source').click()
  await expect(page.getByLabel('Markdown source')).toContainText('# Sample Basic')
  await expect(page.getByLabel('Export to DOCX')).toBeDisabled()
})

test('export docx downloads file', async ({ page }) => {
  await page.goto('/')
  await page.locator('input[type="file"]').setInputFiles(basicDoc)
  await expect(page.getByRole('heading', { name: 'Sample Basic' })).toBeVisible()
  const downloadPromise = page.waitForEvent('download')
  await page.getByLabel('Export to DOCX').click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toMatch(/\.docx$/)
})

test('export pdf opens print flow without error', async ({ page, context }) => {
  await page.goto('/')
  await page.locator('input[type="file"]').setInputFiles(basicDoc)
  await expect(page.getByRole('heading', { name: 'Sample Basic' })).toBeVisible()
  const [popup] = await Promise.all([
    context.waitForEvent('page'),
    page.getByLabel('Export to PDF').click(),
  ])
  await expect(popup.locator('body')).toBeAttached({ timeout: 5000 })
  await popup.close()
})
