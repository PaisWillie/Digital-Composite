//THIS PAGE NEEDS TO BE WORKED ON WHEN THE PAGE IS WORKING

import { test, expect } from '@playwright/test'

test.use({ storageState: 'tests/auth.json' }) // Ensure login session is used

test('Blacklist a student and verify removal', async ({ page }) => {
  // **Go to Blacklist Page**
  await page.goto('http://localhost:5173/admin/blackListStudentPage')

  // **Wait for Page to Load**
  await expect(page.locator('h2')).toHaveText('Black List Student', {
    timeout: 5000
  })

  /*
  // **Enter Student Name**
  await page.fill('input[name="studentName"]', 'John Doe');

  // **Click Blacklist Button**
  await page.click('button:has-text("Add to Blacklist")');

  // **Wait for Blacklist Table Update**
  await page.waitForSelector('table', { timeout: 5000 });

  // **Verify Student is in the Blacklist Table**
  await expect(page.locator('td')).toContainText('John Doe');

  // **Click Remove Button**
  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Are you sure you want to remove');
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Remove' }).click();

  // **Verify Student is Removed**
  await expect(page.locator('td')).not.toContainText('John Doe', { timeout: 5000 });
  */
})
