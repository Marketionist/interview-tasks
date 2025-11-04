import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    /* Timeout is shared between all tests */
    timeout: 300000,
    retries: 0,
    workers: 1,
    testDir: 'tests/e2e',
    testMatch: /.*(?<!fast|long)-e2e-spec\.ts/,
    /* Use list and json reporters while running on CI and only list locally */
    reporter: process.env.CI ?
        [['list',], ['json', { outputFile: 'test-results/report.json', },],] :
        'list',
    use: {
        ...devices['Desktop Firefox'],
        headless: true,
        viewport: { width: 1280, height: 720, },
        actionTimeout: 20000,
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'Happy path',
            testMatch: /.*(?<!fast|long)-e2e-spec\.ts/,
            retries: 0,
        },
        {
            name: 'Log in',
            testMatch: /global-setup\.ts/,
            retries: 0,
        },
        {
            name: 'Setup test data',
            testMatch: /.*(?<!global-)setup\.ts/,
            use: {
                storageState: '.auth/user.json',
            },
            dependencies: ['Log in',],
            retries: 0,
        },
        {
            name: 'Fast',
            testMatch: /.*fast-e2e-spec\.ts/,
            use: {
                storageState: '.auth/user.json',
            },
            dependencies: ['Setup test data',],
            retries: 1,
        },
        {
            name: 'Long',
            testMatch: /.*long-e2e-spec\.ts/,
            use: {
                storageState: '.auth/user.json',
            },
            dependencies: ['Setup test data',],
            retries: 2,
        },
    ],
});
