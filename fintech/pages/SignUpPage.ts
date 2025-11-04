import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

interface SignUpConfig {
    firstName: string;
    lastName: string;
    phone: string;
    region: string;
    email: string;
}

export class SignUpPage extends BasePage {
    public titleCreateAccount = 'h2[data-testid="typography"]';
    public blockPasswordInstructions = '//*[preceding-sibling::*[' +
        'descendant::*[contains(@data-testid, "password-input")]] and ' +
        'contains(@data-testid, "typography")]';
    public labelAgreement = '[data-testid="typography"]' +
        '[for="leadDistributeConsentAgreement"]';
    public buttonLanguageSwitchEn = this.createButtonLanguageSwitchSelector(
        'EN');
    public buttonLanguageSwitchFr = this.createButtonLanguageSwitchSelector(
        'FR');
    public buttonMyPortfolioEn = this.createButtonMyPortfolioSelector(
        'My Portfolio');
    public buttonMyPortfolioFr = this.createButtonMyPortfolioSelector(
        'Mon portfolio');
    public textFieldRequiredEn = 'The field is required';
    public textFieldRequiredFr = 'Ce champ est obligatoire.';
    public textTooLongEn = 'Too many characters';
    public textTooLongFr = 'Trop de caractères';
    public blockFirstNameEmptyErrorEn = this.createBlockInputErrorSelector(
        'first-name', this.textFieldRequiredEn);
    public blockLastNameEmptyErrorEn = this.createBlockInputErrorSelector(
        'last-name', this.textFieldRequiredEn);
    public blockFirstNameEmptyErrorFr = this.createBlockInputErrorSelector(
        'first-name', this.textFieldRequiredFr);
    public blockLastNameEmptyErrorFr = this.createBlockInputErrorSelector(
        'last-name', this.textFieldRequiredFr);
    public blockFirstNameTooLongErrorEn = this.createBlockInputErrorSelector(
        'first-name', this.textTooLongEn);
    public blockLastNameTooLongErrorEn = this.createBlockInputErrorSelector(
        'last-name', this.textTooLongEn);
    public blockFirstNameTooLongErrorFr = this.createBlockInputErrorSelector(
        'first-name', this.textTooLongFr);
    public blockLastNameTooLongErrorFr = this.createBlockInputErrorSelector(
        'last-name', this.textTooLongFr);

    private createButtonLanguageSwitchSelector (text: string): string {
        return '//*[contains(@data-testid, "header-language-switch") and ' +
            `contains(text(), "${text}")]`;
    }
    private createButtonMyPortfolioSelector (text: string): string {
        return '//*[contains(@data-testid, "my-portfolio-button") and ' +
        `contains(text(), "${text}")]`;
    }
    private createBlockInputErrorSelector (
        inputName: string, errorText: string
    ): string {
        return '//*[contains(@data-testid, ' +
        `"${inputName}-error-message-typography") and ` +
        `contains(., "${errorText}")]`;
    }

    protected page: Page;
    private inputFirstName = '[data-testid="first-name-input"]';
    private inputLastName = '[data-testid="last-name-input"]';
    private inputPhoneNumber = '[data-testid="phoneInput"]';
    private selectProvince = '[data-testid="region-select"]';
    private inputEmail = '[data-testid="email-input"]';
    private inputPassword = '[data-testid="password-input"]';
    private inputConfirmPassword = '[data-testid="passwordConfirmation-input"]';
    private checkboxAgreement = '[data-testid="agreement-checkbox"]';
    private buttonCreateAccount = '[data-testid="submit-button"]';

    constructor (page: Page) {
        super();
        this.page = page;
    }

    async verifySignUpFieldsLabels (): Promise<void> {
        await expect(this.page.locator(this.titleCreateAccount)).toBeVisible();
        await expect(this.page.locator(this.inputFirstName)).toBeVisible();
        await expect(this.page.locator(this.inputLastName)).toBeVisible();
        await expect(this.page.locator(this.inputPhoneNumber)).toBeVisible();
        await expect(this.page.locator(this.selectProvince)).toBeVisible();
        await expect(this.page.locator(this.inputEmail)).toBeVisible();
        await expect(this.page.locator(this.inputPassword)).toBeVisible();
        await expect(this.page.locator(this.blockPasswordInstructions))
            .toBeVisible();
        await expect(this.page.locator(this.inputConfirmPassword))
            .toBeVisible();
        await expect(this.page.locator(this.checkboxAgreement)).toBeVisible();
        await expect(this.page.locator(this.labelAgreement)).toBeVisible();
        await expect(this.page.locator(this.buttonCreateAccount)).toBeVisible();
    }

    async signUp (config: SignUpConfig): Promise<void> {
        await this.page.locator(this.inputFirstName).fill(config.firstName);
        await this.page.locator(this.inputLastName).fill(config.lastName);
        await this.page.locator(this.inputPhoneNumber).fill(config.phone);
        await this.page.locator(this.selectProvince)
            .selectOption(config.region);
        await this.page.locator(this.inputEmail).fill(config.email);
        await this.page.locator(this.inputPassword).fill(this.userPassword);
        await this.page.locator(this.inputConfirmPassword)
            .fill(this.userPassword);

        // const buttonAcceptCookies = this.page.locator(this.buttonAcceptCookies);

        // if (await buttonAcceptCookies.isVisible()) {
        //     await buttonAcceptCookies.click();
        // }

        await this.page.locator(this.buttonCreateAccount).click();
    }

    async verifyLoggedIn (buttonSelector: string): Promise<void> {
        await expect(this.page.locator(buttonSelector)).toBeVisible({
            timeout: 20000,
        });
    }

    async verifyInputErrors (
        blockError1Selector: string, blockError2Selector: string
    ): Promise<void> {
        await expect(this.page.locator(blockError1Selector)).toBeVisible({
            timeout: 5000,
        });
        await expect(this.page.locator(blockError2Selector)).toBeVisible({
            timeout: 5000,
        });
    }
}
