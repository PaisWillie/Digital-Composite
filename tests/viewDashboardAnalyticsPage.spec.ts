import { test, expect } from '@playwright/test';

test.use({ storageState: 'tests/auth.json' }); // Ensure login session is used

test('Navigate to View Dashboard Analytics Page and Validate Content', async ({ page }) => {
  // **Step 1: Navigate to the Admin Page**
  await page.goto('http://localhost:5173/admin');

  // **Step 2: Click the "View Dashboard Analytics" button**
  await page.click('button:has-text("View Dashboard Analytics")');

  // **Step 3: Ensure we are on the correct page**
  await expect(page).toHaveURL('http://localhost:5173/admin/viewDashboardAnalyticsPage');

  // **Step 4: Verify Page Title**
  await expect(page.locator('h2')).toHaveText('Dashboard Analytics');

  // **Step 5: Check if analytics cards are visible**
  await expect(page.locator('text=Total Views')).toBeVisible();
  await expect(page.locator('text=Total Composites Uploaded')).toBeVisible();
  await expect(page.locator('text=Total Active Programs')).toBeVisible();

  // **Step 7: Verify "Most Common Search Terms" Section**
  await expect(page.locator('text=Most Common Search Terms')).toBeVisible();

  // **Step 8: Verify "Most Viewed Composites" Section**
  await expect(page.locator('text=Most Viewed Composites')).toBeVisible();

  // **Step 9: Ensure the search trends chart is rendered**
  //await expect(page.locator('img')).toBeVisible();

});
