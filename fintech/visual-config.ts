import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    /* Timeout is shared between all tests */
    timeout: 60000,
    retries: 0,
    workers: 8,
    fullyParallel: true,
    testDir: 'tests/visual',
    testMatch: /.*(?<!fast|long)-visual-spec\.ts/,
    expect: {
        timeout: 10000,
        toMatchSnapshot: {
            maxDiffPixelRatio: 0.15,
        },
    },
    use: {
        ...devices['Desktop Firefox'],
        headless: true,
        viewport: { width: 1280, height: 720, },
        actionTimeout: 20000,
        ignoreHTTPSErrors: true,
        video: 'off',
        screenshot: 'off',
    },
    projects: [
        {
            name: 'Happy path English',
            testMatch: /.*(?<!fast|long)-en-visual-spec\.ts/,
        },
        {
            name: 'Happy path French',
            testMatch: /.*(?<!fast|long)-fr-visual-spec\.ts/,
        },
        // /* Test against desktop browsers */
        // {
        //     name: 'Chromium',
        //     use: { ...devices['Desktop Chrome'], },
        // },
        // {
        //     name: 'Firefox',
        //     use: { ...devices['Desktop Firefox'], },
        // },
        // {
        //     name: 'Webkit',
        //     use: { ...devices['Desktop Safari'], },
        // },
        // /* Test against mobile viewports */
        // {
        //     name: 'Mobile Chrome',
        //     use: { ...devices['Pixel 5'], },
        // },
        // {
        //     name: 'Mobile Safari',
        //     use: { ...devices['iPhone 12'], },
        // },
        // /* Test against branded browsers */
        // {
        //     name: 'Google Chrome',
        //     use: { ...devices['Desktop Chrome'], channel: 'chrome', }, // or 'chrome-beta'
        // },
        // {
        //     name: 'Microsoft Edge',
        //     use: { ...devices['Desktop Edge'], channel: 'msedge', }, // or 'msedge-dev'
        // },
    ],
});
