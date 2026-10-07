import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';

// Replit supplies a wrapped Chromium; CI uses Playwright's browser builds.
const localChromium = existsSync('/repl/tools/bin/chromium')
  ? '/repl/tools/bin/chromium'
  : undefined;

export default defineConfig({
  testDir: './tests',
  timeout: 90000,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    headless: true,
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium', launchOptions: { executablePath: localChromium } } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
  webServer: {
    command: 'npm run preview -- --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
  },
});
