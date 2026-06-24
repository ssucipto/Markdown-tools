import { test, expect } from '@playwright/test'
import path from 'node:path'

const basicDoc = path.join(process.cwd(), 'docs', 'sample-basic.md')
const mermaidDoc = path.join(process.cwd(), 'docs', 'sample-mermaid.md')

function filePicker(page: import('@playwright/test').Page) {
  return page.getByTestId('file-picker-input').first()
}

test('new tab button creates empty tab', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('new-tab-button').click()
  await expect(page.getByTestId('document-tab')).toHaveCount(1)
  await expect(page.getByText(/Drop a/i)).toBeVisible()
})

test('multiple tabs switch content', async ({ page }) => {
  await page.goto('/')
  await filePicker(page).setInputFiles(basicDoc)
  await expect(page.getByRole('heading', { name: 'Sample Basic' })).toBeVisible()

  await page.getByTestId('new-tab-button').click()
  await filePicker(page).setInputFiles(mermaidDoc)
  await expect(page.locator('main article .mermaid-container svg').first()).toBeVisible({ timeout: 25_000 })

  await page.getByTestId('document-tab').first().click()
  await expect(page.getByRole('heading', { name: 'Sample Basic' })).toBeVisible()
})

test('tab bar visible on load', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('tab-bar')).toBeVisible()
})

test('explorer collapse toggles panel', async ({ page }) => {
  await page.addInitScript(() => localStorage.removeItem('mdtools.explorer.collapsed'))
  await page.goto('/')
  await filePicker(page).setInputFiles(basicDoc)
  await expect(page.getByRole('heading', { name: 'Sample Basic' })).toBeVisible()

  const docsDir = path.join(process.cwd(), 'docs')
  await page.getByTestId('folder-picker-input').setInputFiles(docsDir)
  await expect(page.getByTestId('file-explorer')).toBeVisible()
  await expect(page.getByTestId('file-explorer')).toHaveAttribute('aria-hidden', 'false')

  await page.getByTestId('explorer-collapse-toggle').click()
  await expect(page.getByTestId('file-explorer')).toHaveAttribute('aria-hidden', 'true')

  await page.getByLabel('Toggle file explorer panel').click()
  await expect(page.getByTestId('file-explorer')).toHaveAttribute('aria-hidden', 'false')
})
