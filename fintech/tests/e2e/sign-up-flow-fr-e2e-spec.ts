import { test } from '@playwright/test';
import { SignUpPage } from '../../pages/SignUpPage';

test.describe('Sign up e2e French', () => {

    test.beforeEach(async ({ page, context, }) => {
        const signUpPage = new SignUpPage(page);

        await page.goto(`${signUpPage.baseUrl}/signup`);
        await page.getByRole('link', { name: signUpPage.textLanguageFr, }).click();
    });

    test(
        'Verify sign up fields and labels.',
        async ({ page, }) => {
            const signUpPage = new SignUpPage(page);

            await signUpPage.verifySignUpFieldsLabelsFr();
        }
    );

    test(
        'Sign up with all valid inputs.',
        async ({ page, }) => {
            const signUpPage = new SignUpPage(page);

            await signUpPage.signUpFr({
                firstName: signUpPage.userDataFr.firstName,
                lastName: signUpPage.userDataFr.lastName,
                phone: signUpPage.userDataFr.phone,
                region: signUpPage.textRegionFr,
                email: signUpPage.userDataFr.email,
            });
            await signUpPage.verifyLoggedInFr();
        }
    );

    test(
        'Sign up with extended First name, Last name, phone and region inputs.',
        async ({ page, }) => {
            const signUpPage = new SignUpPage(page);

            await signUpPage.signUpFr({
                firstName: 'Jean-François',
                lastName: 'd\'Aboville-Bélanger',
                phone: '506 123 4567',
                region: 'Nouveau-Brunswick',
                email: signUpPage.createEmailWithTimestamp(7),
            });
            await signUpPage.verifyLoggedInFr();
        }
    );

    test(
        'Sign up with 0 characters in First name and Last name ' +
            'inputs - error messages should be displayed.',
        async ({ page, }) => {
            const signUpPage = new SignUpPage(page);

            await signUpPage.signUpFr({
                firstName: '',
                lastName: '',
                phone: signUpPage.userDataFr.phone,
                region: signUpPage.textRegionFr,
                email: signUpPage.createEmailWithTimestamp(8),
            });
            await signUpPage.verifyInputErrors(
                signUpPage.blockFirstNameEmptyErrorFr,
                signUpPage.blockLastNameEmptyErrorFr
            );
        }
    );

    test(
        'Sign up with 64 characters in First name and Last name ' +
            'inputs - error messages should be displayed.',
        async ({ page, }) => {
            const signUpPage = new SignUpPage(page);

            await signUpPage.signUpFr({
                firstName: signUpPage.textFirstName64Chars,
                lastName: signUpPage.textLastName64Chars,
                phone: signUpPage.userDataFr.phone,
                region: signUpPage.textRegionFr,
                email: signUpPage.createEmailWithTimestamp(9),
            });
            await signUpPage.verifyInputErrors(
                signUpPage.blockFirstNameTooLongErrorFr,
                signUpPage.blockLastNameTooLongErrorFr
            );
        }
    );

    test(
        'Sign up with XSS script in First name and Last name ' +
            'inputs - error messages should be displayed.',
        async ({ page, }) => {
            const signUpPage = new SignUpPage(page);

            await signUpPage.signUpFr({
                firstName: '<script>alert(\'This code was executed - First name XSS risk!!!\');</script>',
                lastName: '<script>alert(\'This code was executed - Last name XSS risk!!!\');</script>',
                phone: signUpPage.userDataFr.phone,
                region: signUpPage.textRegionFr,
                email: signUpPage.createEmailWithTimestamp(10),
            });
            await signUpPage.verifyInputErrors(
                signUpPage.blockFirstNameEmptyErrorFr,
                signUpPage.blockLastNameEmptyErrorFr
            );
        }
    );

});
