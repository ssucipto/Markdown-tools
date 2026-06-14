import { test, expect } from '@playwright/test'

test('math sample renders KaTeX', async ({ page }) => {
  await page.goto('/')
  const buffer = await page.evaluate(async () => {
    const res = await fetch('/docs/sample-math.md')
    return res.text()
  })
  expect(buffer).toContain('E=mc^2')

  await page.evaluate(async (md) => {
    const input = document.querySelector('input[type=file]') as HTMLInputElement
    if (!input) return
    const file = new File([md], 'sample-math.md', { type: 'text/markdown' })
    const dt = new DataTransfer()
    dt.items.add(file)
    input.files = dt.files
    input.dispatchEvent(new Event('change', { bubbles: true }))
  }, buffer)

  await expect(page.locator('.katex')).toBeVisible({ timeout: 15000 })
})
