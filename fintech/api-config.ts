import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    /* Timeout is shared between all tests */
    timeout: 120000,
    retries: 0,
    workers: 1,
    testDir: 'tests/api',
    testMatch: /.*(?<!fast|long)-api-spec\.ts/,
    /* Use list and json reporters while running on CI and only list locally */
    reporter: process.env.CI ?
        [['list',], ['json', { outputFile: 'test-results/report.json', },],] :
        'list',
    use: {
        ...devices['Desktop Firefox'],
        headless: true,
        ignoreHTTPSErrors: true,
    },
    projects: [
        {
            name: 'Happy path',
            testMatch: /.*(?<!fast|long)-api-spec\.ts/,
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
            testMatch: /.*fast-api-spec\.ts/,
            use: {
                storageState: '.auth/user.json',
                /* An object containing additional HTTP headers to be sent with
                every request */
                // extraHTTPHeaders: {
                //     'X-My-Header': 'value',
                // },
            },
            dependencies: ['Setup test data',],
            retries: 1,
        },
        {
            name: 'Long',
            testMatch: /.*long-api-spec\.ts/,
            use: {
                storageState: '.auth/user.json',
                /* An object containing additional HTTP headers to be sent with
                every request */
                // extraHTTPHeaders: {
                //     'X-My-Header': 'value',
                // },
            },
            dependencies: ['Setup test data',],
            retries: 2,
        },
    ],
});
