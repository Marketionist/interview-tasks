import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LogInPage extends BasePage {
    public memberEmail = process.env.MEMBER_LOGIN ?? '';
    public memberPassword = process.env.MEMBER_PASS ?? '';
    public userEmail = process.env.USER_LOGIN ?? '';
    public userPassword = process.env.USER_PASS ?? '';

    private buttonAcceptCookies = '[data-tid="banner-accept"]';
    private inputEmail = '#email';
    private inputPassword = '#password';
    private buttonSubmit = '//*[contains(@class, "submit-btn") and ' +
        'not(contains(@class, "--appear-disabled-new"))]';

    constructor (page: Page) {
        super(page);
    }

    async logIn (url: string, email: string, password: string): Promise<void> {
        await this.page.goto(`${url}/sign-in`);
        await this.page.locator(this.inputEmail).fill(email);
        await this.page.locator(this.inputPassword).fill(password);

        const buttonAcceptCookies = this.page.locator(this.buttonAcceptCookies);

        if (await buttonAcceptCookies.isVisible()) {
            await buttonAcceptCookies.click();
        }

        await this.page.locator(this.buttonSubmit).click();
    }
}
