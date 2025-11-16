import { test, expect } from '@playwright/test';
import { SignUpPage } from '../../pages/SignUpPage';

test.describe('Sign up visual regression English', () => {

    test.beforeEach(async ({ page, context, }) => {
        const signUpPage = new SignUpPage(page);

        await page.goto(`${signUpPage.baseUrl}/signup`);
        await expect(page.getByRole(
            'link', { name: signUpPage.textLanguageFr, exact: true }
        )).toBeVisible({ timeout: 20000, });
    });

    test('Full page snapshot.', async ({ page, }) => {
        // See https://github.com/microsoft/playwright/issues/10219#issuecomment-1062120505 and
        // https://playwright.dev/docs/test-assertions#page-assertions-to-have-screenshot-2
        // for all toHaveScreenshot options
        expect(await page.screenshot({ fullPage: true, }))
            .toMatchSnapshot(
                'sign-up-page-en-full.png',
                { maxDiffPixelRatio: 0.01, }
            );
    });

    test(
        'Page title and labels text comparison.',
        async ({ page, }) => {
            const signUpPage = new SignUpPage(page);

            expect(await page.getByRole('heading').textContent())
                .toMatchSnapshot('sign-up-page-en-title.txt');
            expect(await page.textContent(signUpPage.blockPasswordInstructions))
                .toMatchSnapshot(
                    'sign-up-page-en-block-password-instructions.txt'
                );
            expect(await page.textContent(signUpPage.labelAgreement))
                .toMatchSnapshot('sign-up-page-en-label-agreement.txt');
        }
    );

});
