import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  reporter: [['html', { open: 'never' }]], // 📌 Generates HTML reports
  use: {
    headless: false, // Runs in UI mode
    browserName: 'chromium', // Can be changed to 'firefox' or 'webkit'
    ignoreHTTPSErrors: true,
    storageState: undefined, // 🚀 Ensures NO session state is reused
    contextOptions: {
      bypassCSP: true // Helps with testing applications using CSP
    },
    trace: 'on', // 🔍 Enables trace viewer for debugging
    video: 'on', // 🎥 Records test execution video
    screenshot: 'on' // 📸 Takes screenshots on failure
  }
})
