import { test, expect } from '@playwright/test'

test('Login and Save State', async ({ page }) => {
  await page.goto('http://localhost:5173/admin')

  // Fill email and password
  await page.fill(
    'input[name="username"]',
    'digitalcompositeMcMaster@gmail.com'
  )
  await page.fill('input[name="password"]', 'McMasterproject1')

  // Click login button
  await page.click('button:has-text("Continue")')

  // Wait for successful login redirection
  await page.waitForURL('http://localhost:5173/admin')

  // Save authentication state
  await page.context().storageState({ path: 'tests/auth.json' })

  // Ensure we are on the admin dashboard
  await expect(page.locator('h2')).toHaveText('Admin Dashboard')
})
