import { defineConfig, devices, } from '@playwright/test';

export default defineConfig({
    /* Timeout is shared between all tests */
    timeout: 60000,
    retries: 0,
    testDir: 'tests/e2e',
    testMatch: /.*(?<!fast|long)-e2e-spec\.ts/,
    /* Use list and json reporters while running on CI and only list locally */
    reporter: process.env.CI ? [['list',], ['json', { outputFile: 'test-results/report.json' }],] : 'list',
    use: {
        ...devices['Desktop Firefox'],
        headless: true,
        viewport: { width: 1280, height: 720, },
        actionTimeout: 20000,
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
});
