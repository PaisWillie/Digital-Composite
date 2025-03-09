import { test, expect } from '@playwright/test'

test.use({ storageState: 'tests/auth.json' }) // Load saved login session

test.describe('Admin Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/admin') // Admin Dashboard
  })

  test('Verify Admin Dashboard buttons are visible', async ({ page }) => {
    await expect(page.locator('h2')).toHaveText('Admin Dashboard')

    await expect(
      page.getByRole('button', { name: 'Upload Composite' })
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Manage Composites' })
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Black List Student' })
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'View Dashboard Analytics' })
    ).toBeVisible()
  })

  test('Navigate to Upload Page', async ({ page }) => {
    await page.getByRole('button', { name: 'Upload Composite' }).click()
    await expect(page).toHaveURL('http://localhost:5173/admin/uploadPage')
  })

  test('Navigate to Manage Composites Page', async ({ page }) => {
    await page.getByRole('button', { name: 'Manage Composites' }).click()
    await expect(page).toHaveURL(
      'http://localhost:5173/admin/manageCompositesPage'
    )
  })

  test('Navigate to Black List Student Page', async ({ page }) => {
    await page.getByRole('button', { name: 'Black List Student' }).click()
    await expect(page).toHaveURL(
      'http://localhost:5173/admin/blackListStudentPage'
    )
  })

  test('Navigate to View Dashboard Analytics Page', async ({ page }) => {
    await page.getByRole('button', { name: 'View Dashboard Analytics' }).click()
    await expect(page).toHaveURL(
      'http://localhost:5173/admin/viewDashboardAnalyticsPage'
    )
  })
})
