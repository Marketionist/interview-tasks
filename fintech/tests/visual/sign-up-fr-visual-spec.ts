import { test, expect } from '@playwright/test';
import { SignUpPage } from '../../pages/SignUpPage';

test.describe('Sign up visual regression French', () => {

    test.beforeEach(async ({ page, context, }) => {
        const signUpPage = new SignUpPage(page);

        await page.goto(`${signUpPage.baseUrl}/signup`);
        await page.locator(signUpPage.buttonLanguageSwitchFr).click();
        await expect(page.locator(signUpPage.buttonLanguageSwitchEn))
            .toBeVisible({ timeout: 20000, });
    });

    test('Full page snapshot.', async ({ page, }) => {
        expect(await page.screenshot({ fullPage: true, })).toMatchSnapshot(
            'sign-up-page-fr-full.png',
            { maxDiffPixelRatio: 0.01, }
        );
    });

    test(
        'Page title and labels text comparison.',
        async ({ page, }) => {
            const signUpPage = new SignUpPage(page);

            expect(await page.textContent(signUpPage.titleCreateAccount))
                .toMatchSnapshot('sign-up-page-fr-title.txt');
            expect(await page.textContent(signUpPage.blockPasswordInstructions))
                .toMatchSnapshot(
                    'sign-up-page-fr-block-password-instructions.txt'
                );
            expect(await page.textContent(signUpPage.labelAgreement))
                .toMatchSnapshot('sign-up-page-fr-label-agreement.txt');
        }
    );

});
