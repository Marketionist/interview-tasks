import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    public email = process.env.LOGIN ?? '';
    public password = process.env.PASSWORD ?? '';

    private baseUrl = 'https://myezra-staging.ezra.com';
    private buttonAcceptCookies = '[data-tid="banner-accept"]';
    private inputEmail = '#email';
    private inputPassword = '#password';
    private buttonLogIn = '//*[contains(@class, "submit-btn") and ' +
        'not(contains(@class, "--appear-disabled-new"))]';

    constructor(page: Page) {
        super(page);
    }

    async logIn (email: string, password: string) {
        await this.page.goto(`${this.baseUrl}/sign-in`);
        await this.page.locator(this.buttonAcceptCookies).click();
        await this.page.locator(this.inputEmail).fill(email);
        await this.page.locator(this.inputPassword).fill(password);
        await this.page.locator(this.buttonLogIn).click();
    }
}
