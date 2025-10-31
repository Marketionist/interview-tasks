import { Page } from '@playwright/test';

export class BasePage {
    public urlMemberPortal: string;
    public urlUserPortal: string;

    protected page: Page;
    protected buttonContinue: string;

    constructor (page: Page) {
        this.page = page;
        this.urlMemberPortal = 'https://myezra-staging.ezra.com';
        this.urlUserPortal = 'https://staging-hub.ezra.com';
        this.buttonContinue = '//*[ancestor::*[contains(@id, ' +
            '"buttons-container")] and not(contains(@class, ' +
            '"--appear-disabled")) and @data-test="submit"]';
    }
}
