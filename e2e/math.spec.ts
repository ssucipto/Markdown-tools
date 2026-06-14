import { test, expect } from '@playwright/test'
import path from 'node:path'

const mathDoc = path.join(process.cwd(), 'docs', 'sample-math.md')

test('math sample renders KaTeX', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('file-picker-input').setInputFiles(mathDoc)
  await expect(page.locator('main article .katex').first()).toBeVisible({ timeout: 15_000 })
})
