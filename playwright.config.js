// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    timeout: 40 * 1000
  },
  reporter: 'html',
  use: {
    headless: true,
    browserName: 'chromium',
  },
});

module.exports = config;

