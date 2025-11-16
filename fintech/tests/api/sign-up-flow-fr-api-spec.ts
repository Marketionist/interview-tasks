import { test, expect } from '@playwright/test';
import { SignUpApiPage } from '../../pages/SignUpApiPage';

test.describe('Sign up API French', () => {
    let bearerToken: string;

    test.afterEach(async ({ request, }) => {
        const signUpApiPage = new SignUpApiPage(request);
        const deleteAccountResponse = await signUpApiPage.deleteAccountApi(
            bearerToken);

        signUpApiPage.verifyAccountDeletedApi(deleteAccountResponse);
    });

    test(
        'POST /api/accounts - sign up with all valid inputs.',
        async ({ request, }) => {
            const signUpApiPage = new SignUpApiPage(request);
            const signUpResponse = await signUpApiPage.signUpApi({
                language: signUpApiPage.userDataFr.language,
                firstName: signUpApiPage.userDataFr.firstName,
                lastName: signUpApiPage.userDataFr.lastName,
                phone: signUpApiPage.userDataFr.phone,
                region: signUpApiPage.userDataFr.region,
                email: signUpApiPage.userDataFr.email,
                password: signUpApiPage.userDataFr.password,
                leadDistributeConsentAgreement:
                    signUpApiPage.userDataFr.leadDistributeConsentAgreement,
            });
            const signUpResponseBody = await signUpApiPage
                .verifyAccountCreatedApi(
                    signUpResponse,
                    {
                        preferredLanguage: signUpApiPage.userDataFr.language,
                        firstName: signUpApiPage.userDataFr.firstName,
                        lastName: signUpApiPage.userDataFr.lastName,
                        phone: signUpApiPage.userDataFr.phone,
                        region: signUpApiPage.userDataFr.region,
                        email: signUpApiPage.userDataFr.email,
                        leadDistributeConsentAgreement: signUpApiPage
                            .userDataFr.leadDistributeConsentAgreement,
                    }
                );

            // Save Bearer token to delete test account later on
            bearerToken = signUpResponseBody.token.accessToken;
        }
    );

});
