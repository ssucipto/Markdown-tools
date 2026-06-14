import { test, expect } from '@playwright/test'
import path from 'node:path'

test('empty state visible', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText(/Drop a/i)).toBeVisible()
})

test('file picker loads markdown', async ({ page }) => {
  await page.goto('/')
  const filePath = path.join(process.cwd(), 'docs', 'sample-basic.md')
  await page.locator('input[type="file"]').setInputFiles(filePath)
  await expect(page.getByRole('heading', { name: 'Sample Basic' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Intro' })).toBeVisible()
})

test('mermaid document renders toolbar', async ({ page }) => {
  await page.goto('/')
  const filePath = path.join(process.cwd(), 'docs', 'sample-mermaid.md')
  await page.locator('input[type="file"]').setInputFiles(filePath)
  await expect(page.getByLabel('Export to Word')).toBeVisible()
  await expect(page.getByLabel('Export to PDF')).toBeVisible()
})
