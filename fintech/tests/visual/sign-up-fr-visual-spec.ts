import { test, expect } from '@playwright/test';
import { SignUpPage } from '../../pages/SignUpPage';

test.describe('Sign up visual regression French', () => {

    test.beforeEach(async ({ page, context, }) => {
        const signUpPage = new SignUpPage(page);

        await page.goto(`${signUpPage.baseUrl}/signup`);
        await page.getByRole(
            'link', { name: signUpPage.textLanguageFr, exact: true }
        ).click();
        await expect(page.getByRole(
            'link', { name: signUpPage.textLanguageEn, exact: true }
        )).toBeVisible({ timeout: 20000, });
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

            expect(await page.getByRole('heading').textContent())
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
