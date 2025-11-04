import { test, expect } from '@playwright/test';
import { SignUpApiPage } from '../../pages/SignUpApiPage';

test.describe('Sign up API English', () => {
    let bearerToken: string;

    test.afterEach(async ({ request, }) => {
        const signUpApiPage = new SignUpApiPage(request);
        const deleteAccountResponse = await signUpApiPage.deleteAccountApi(
            bearerToken);

        await signUpApiPage.verifyAccountDeletedApi(deleteAccountResponse);
    });

    test(
        'POST /api/accounts - sign up with all valid inputs.',
        async ({ request, }) => {
            const signUpApiPage = new SignUpApiPage(request);
            const signUpResponse = await signUpApiPage.signUpApi({
                language: signUpApiPage.userDataEn.language,
                firstName: signUpApiPage.userDataEn.firstName,
                lastName: signUpApiPage.userDataEn.lastName,
                phone: signUpApiPage.userDataEn.phone,
                region: signUpApiPage.userDataEn.region,
                email: signUpApiPage.userDataEn.email,
                password: signUpApiPage.userDataEn.password,
                leadDistributeConsentAgreement:
                    signUpApiPage.userDataEn.leadDistributeConsentAgreement,
            });
            const signUpResponseBody = await signUpApiPage
                .verifyAccountCreatedApi(
                    signUpResponse,
                    {
                        preferredLanguage: signUpApiPage.userDataEn.language,
                        firstName: signUpApiPage.userDataEn.firstName,
                        lastName: signUpApiPage.userDataEn.lastName,
                        phone: signUpApiPage.userDataEn.phone,
                        region: signUpApiPage.userDataEn.region,
                        email: signUpApiPage.userDataEn.email,
                        leadDistributeConsentAgreement: signUpApiPage
                            .userDataEn.leadDistributeConsentAgreement,
                    }
                );

            // Save Bearer token to delete test account later on
            bearerToken = signUpResponseBody.token.accessToken;
        }
    );

});
