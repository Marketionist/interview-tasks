import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserDataInterface } from './UserDataInterface';
import { AccountCreationResponseInterface } from './AccountCreationResponseInterface';

interface SignUpResponseBodyObject {
    token: {
        accessToken: string;
    },
    account: AccountCreationResponseInterface;
}


export class SignUpApiPage extends BasePage {
    protected request: APIRequestContext;

    constructor (request: APIRequestContext) {
        super();
        this.request = request;
    }

    async signUpApi (config: UserDataInterface): Promise<APIResponse> {
        const signUpResponse = await this.request.post(
            `${this.baseUrl}/api/accounts`,
            {
                headers: {
                },
                data: {
                    language: config.language,
                    firstName: config.firstName,
                    lastName: config.lastName,
                    phone: config.phone,
                    region: config.region,
                    email: config.email,
                    password: config.password,
                    leadDistributeConsentAgreement:
                        config.leadDistributeConsentAgreement,
                },
            }
        );

        return signUpResponse;
    }

    async verifyAccountCreatedApi (
        signUpResponse: APIResponse,
        config: AccountCreationResponseInterface
    ): Promise<SignUpResponseBodyObject> {
        const signUpResponseBody = await signUpResponse
            .json() as SignUpResponseBodyObject;

        expect(signUpResponse.status()).toBe(201);
        expect(signUpResponseBody.token.accessToken.length)
            .toBeGreaterThan(0);
        expect(signUpResponseBody.account).toEqual(
            expect.objectContaining({
                preferredLanguage: config.preferredLanguage,
                firstName: config.firstName,
                lastName: config.lastName,
                phone: config.phone,
                region: config.region,
                email: config.email,
                leadDistributeConsentAgreement:
                    config.leadDistributeConsentAgreement,
            })
        );
        // More fancy way of checking the same userData properties
        // const { language, password, ...trimmedUserData } = config;

        // expect(signUpResponseBody.account).toEqual(
        //     expect.objectContaining({
        //         ...trimmedUserData,
        //         preferredLanguage: config.language,
        //     })
        // );

        return signUpResponseBody;
    }


    async deleteAccountApi (bearerToken: string): Promise<APIResponse> {
        const deleteAccountResponse = await this.request.post(
            `${this.baseUrl}/api/account/deletion`,
            {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
                data: {
                    reason: 'NO_REASON',
                    comments: 'test',
                },
            }
        );

        return deleteAccountResponse;
    }

    verifyAccountDeletedApi (deleteAccountResponse: APIResponse): void {
        expect(deleteAccountResponse.status()).toBe(204);
    }

}
