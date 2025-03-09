//This Page needs to be worked on when full functionality is implemented
import { test, expect } from '@playwright/test'

test.describe('Manage Composites Page Tests', () => {
  test.use({ storageState: 'tests/auth.json' }) // Load saved login session

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/admin/manageCompositesPage') // Navigate to the page
  })

  test('Verify Manage Composites Page Elements', async ({ page }) => {
    await expect(page.locator('h2')).toHaveText('Manage Composites') // Verify Page Title

    // Check dropdowns exist
    await expect(page.locator('label:text("Select Program")')).toBeVisible()
    await expect(page.locator('label:text("Select Year")')).toBeVisible()
  })

  test('Filter composites by Program & Year and check table', async ({
    page
  }) => {
    // Select Program
    await page.locator('#react-select-2-input').fill('Software Engineering')
    await page.keyboard.press('Enter')

    // Select Year
    await page.locator('#react-select-3-input').fill('2024')
    await page.keyboard.press('Enter')
    await page.waitForTimeout(1000) // Waits for 1 seconds

    /**
    // Wait for table to load and check if it appears
    await page.waitForTimeout(1000); // Allow time for filtering
    await expect(page.locator('table')).toBeVisible();
  */
  })
  /**
  test('Edit a composite', async ({ page }) => {
    // Select filters first
    await page.locator('#react-select-2-input').fill('Software Engineering');
    await page.keyboard.press('Enter');
    await page.locator('#react-select-3-input').fill('2024');
    await page.keyboard.press('Enter');

    // Click the Edit button
    await page.getByRole('button', { name: 'Edit' }).click();

    // Verify navigation to Composite View Page
    await expect(page).toHaveURL(/\/Admin\/CompositeViewPage/);
  });
  */
  /**
  test('Delete a composite', async ({ page }) => {
    // Select filters first
    await page.locator('#react-select-2-input').fill('Software Engineering');
    await page.keyboard.press('Enter');
    await page.locator('#react-select-3-input').fill('2024');
    await page.keyboard.press('Enter');

    // Click Delete button
    const deleteButton = page.getByRole('button', { name: 'Delete' });
    await expect(deleteButton).toBeVisible();
    await deleteButton.click();

    // Confirm deletion
    await page.waitForTimeout(1000); // Allow time for deletion to process
    await expect(page.locator('tbody tr')).toHaveCount(0); // Ensure no composites remain
  });*/
})
