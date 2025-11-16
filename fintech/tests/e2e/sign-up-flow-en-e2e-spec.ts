import { test } from '@playwright/test';
import { SignUpPage } from '../../pages/SignUpPage';

test.describe('Sign up e2e English', () => {

    test.beforeEach(async ({ page, context, }) => {
        const signUpPage = new SignUpPage(page);

        await page.goto(`${signUpPage.baseUrl}/signup`);
    });

    test(
        'Verify sign up fields and labels.',
        async ({ page, }) => {
            const signUpPage = new SignUpPage(page);

            await signUpPage.verifySignUpFieldsLabelsEn();
        }
    );

    test(
        'Sign up with all valid inputs.',
        async ({ page, }) => {
            const signUpPage = new SignUpPage(page);

            await signUpPage.signUpEn({
                firstName: signUpPage.userDataEn.firstName,
                lastName: signUpPage.userDataEn.lastName,
                phone: signUpPage.userDataEn.phone,
                region: signUpPage.textRegionEn,
                email: signUpPage.userDataEn.email,
            });
            await signUpPage.verifyLoggedInEn();
        }
    );

    test(
        'Sign up with extended First name, Last name, phone and region inputs.',
        async ({ page, }) => {
            const signUpPage = new SignUpPage(page);

            await signUpPage.signUpEn({
                firstName: 'Alpha-Bravo Jr. II',
                lastName: 'Charlie-Delta Echo',
                phone: '778 123 4567',
                region: 'British-Columbia',
                email: signUpPage.createEmailWithTimestamp(2),
            });
            await signUpPage.verifyLoggedInEn();
        }
    );

    test(
        'Sign up with 0 characters in First name and Last name ' +
            'inputs - error messages should be displayed.',
        async ({ page, }) => {
            const signUpPage = new SignUpPage(page);

            await signUpPage.signUpEn({
                firstName: '',
                lastName: '',
                phone: signUpPage.userDataEn.phone,
                region: signUpPage.textRegionEn,
                email: signUpPage.createEmailWithTimestamp(4),
            });
            await signUpPage.verifyInputErrors(
                signUpPage.blockFirstNameEmptyErrorEn,
                signUpPage.blockLastNameEmptyErrorEn
            );
        }
    );

    test(
        'Sign up with 64 characters in First name and Last name ' +
            'inputs - error messages should be displayed.',
        async ({ page, }) => {
            const signUpPage = new SignUpPage(page);

            await signUpPage.signUpEn({
                firstName: signUpPage.textFirstName64Chars,
                lastName: signUpPage.textLastName64Chars,
                phone: signUpPage.userDataEn.phone,
                region: signUpPage.textRegionEn,
                email: signUpPage.createEmailWithTimestamp(5),
            });
            await signUpPage.verifyInputErrors(
                signUpPage.blockFirstNameTooLongErrorEn,
                signUpPage.blockLastNameTooLongErrorEn
            );
        }
    );

    test(
        'Sign up with XSS script in First name and Last name ' +
            'inputs - error messages should be displayed.',
        async ({ page, }) => {
            const signUpPage = new SignUpPage(page);

            await signUpPage.signUpEn({
                firstName: '<script>alert(\'This code was executed - First name XSS risk!!!\');</script>',
                lastName: '<script>alert(\'This code was executed - Last name XSS risk!!!\');</script>',
                phone: signUpPage.userDataEn.phone,
                region: signUpPage.textRegionEn,
                email: signUpPage.createEmailWithTimestamp(6),
            });
            await signUpPage.verifyInputErrors(
                signUpPage.blockFirstNameEmptyErrorEn,
                signUpPage.blockLastNameEmptyErrorEn
            );
        }
    );

});
