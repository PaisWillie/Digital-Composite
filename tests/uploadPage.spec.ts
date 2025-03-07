import { test, expect } from '@playwright/test';

test.use({ storageState: 'tests/auth.json' }); // Ensure login session is used

test('Upload an image with program and year selection, then verify Composite View Page', async ({ page }) => {
  await page.goto('http://localhost:5173/admin/uploadPage');

  // **Wait for the page to fully load**
  await page.waitForLoadState('domcontentloaded');

  // **Select the Program from React-Select**
  await page.locator('#react-select-2-input').click();
  await page.locator('#react-select-2-input').fill('Software Engineering'); // Adjust as needed
  await page.keyboard.press('Enter');

  // **Select the Year from React-Select**
  await page.locator('#react-select-3-input').click();
  await page.locator('#react-select-3-input').fill('2024'); // Adjust as needed
  await page.keyboard.press('Enter');

  // **Upload the Image**
  const path = await import('path');
  const filePath = path.resolve('tests/sample.jpg'); // Ensure this file exists
  await page.setInputFiles('input[type="file"]', filePath);

  // **Click the Upload Button**
  await page.click('button:has-text("Upload")');

  // **🕒 Wait for Upload to Complete (Increase Timeout if Needed)**
  await page.waitForSelector('text=File uploaded successfully', { timeout: 180000 }); // 60 seconds

  // **Verify the Success Message**
  await expect(page.locator('text=File uploaded successfully')).toBeVisible();

  // **🆕 Confirm the Page Automatically Redirects to Composite View Page**
  await expect(page).toHaveURL('http://localhost:5173/admin/compositeViewPage');

  // **🆕 Verify Composite View Page Elements**
  await expect(page.locator('h2')).toHaveText('Edit Composite');
  
  // **🆕 Verify the Uploaded Image is Displayed**
  await expect(page.locator('img')).toBeVisible();

  // **🆕 Verify "Return to Upload" Button Exists**
  await expect(page.getByRole('button', { name: 'Save Composite' })).toBeVisible();

});
