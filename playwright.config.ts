import { defineConfig, devices } from '@playwright/test';
import appConfig from './config/customEnvironment';

export default defineConfig({
  testMatch: ['tests/**/*.spec.ts', 'apiTests/**/*.spec.ts'],
  timeout: 40 * 1000,
  expect: {
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html'],
    ['list'],
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: 'allure-results',
        suiteTitle: false,
        environmentInfo: {

          NODE_VERSION: process.version,
          OS: process.platform,
          APP_ENV: appConfig.appEnv,
          BASE_URL: appConfig.baseURL
        }
      }
    ]
  ],

  use: {
    // headless: false,
    trace: 'on-first-retry',
    baseURL: appConfig.baseURL,
    screenshot:"only-on-failure",
    video:"retain-on-failure"
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }


  ]

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
