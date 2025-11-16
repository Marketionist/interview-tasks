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
    public blockPasswordInstructions = '//*[preceding-sibling::*[' +
        'descendant::*[contains(@data-testid, "password-input")]] and ' +
        'contains(@data-testid, "typography")]';
    public labelAgreement = '[data-testid="typography"]' +
        '[for="leadDistributeConsentAgreement"]';
    public textLanguageEn = 'EN';
    public textLanguageFr = 'FR';
    public textRegionEn = 'Ontario';
    public textRegionFr = 'Québec';
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

    private createBlockInputErrorSelector (
        inputName: string, errorText: string
    ): string {
        return '//*[contains(@data-testid, ' +
            `"${inputName}-error-message-typography") and ` +
            `contains(., "${errorText}")]`;
    }

    protected page: Page;

    private textFirstNameEn = 'First name';
    private textLastNameEn = 'Last name';
    private textPhoneNumberEn = 'Phone number';
    private textProvinceEn = 'Province of purchase';
    private textEmailEn = 'Email';
    private textPasswordEn = 'Password';
    private textConfirmPasswordEn = 'Confirm password';
    private textCreateAccountEn = 'Create your account';
    private textMyPortfolioEn = 'My Portfolio';

    private textFirstNameFr = 'Prénom';
    private textLastNameFr = 'Nom';
    private textPhoneNumberFr = 'Téléphone';
    private textProvinceFr = 'Province de l\'achat';
    private textEmailFr = 'Courriel';
    private textPasswordFr = 'Mot de passe';
    private textConfirmPasswordFr = 'Confirmation du mot de passe';
    private textCreateAccountFr = 'Créez votre compte';
    private textMyPortfolioFr = 'Mon portfolio';

    constructor (page: Page) {
        super();
        this.page = page;
    }

    async verifySignUpFieldsLabelsEn (): Promise<void> {
        await expect(this.page.getByRole(
            'link', { name: this.textLanguageFr, exact: true }
        )).toBeVisible();
        await expect(this.page.getByRole('heading')).toBeVisible();
        await expect(this.page.getByLabel(this.textFirstNameEn)).toBeVisible();
        await expect(this.page.getByLabel(this.textLastNameEn)).toBeVisible();
        await expect(this.page.getByLabel(this.textPhoneNumberEn,
            { exact: true })).toBeVisible();
        await expect(this.page.getByRole('combobox',
            { name: this.textProvinceEn })).toBeVisible();
        await expect(this.page.getByLabel(this.textEmailEn)).toBeVisible();
        await expect(this.page.getByLabel(this.textPasswordEn,
            { exact: true })).toBeVisible();
        await expect(this.page.locator(this.blockPasswordInstructions))
            .toBeVisible();
        await expect(this.page.getByLabel(this.textConfirmPasswordEn))
            .toBeVisible();
        await expect(this.page.getByRole('checkbox')).toBeVisible();
        await expect(this.page.locator(this.labelAgreement)).toBeVisible();
        await expect(await this.page.getByRole('button',
            { name: this.textCreateAccountEn })).toBeVisible();
    }

    async verifySignUpFieldsLabelsFr (): Promise<void> {
        await expect(this.page.getByRole(
            'link', { name: this.textLanguageEn, exact: true }
        )).toBeVisible();
        await expect(this.page.getByRole('heading')).toBeVisible();
        await expect(this.page.getByLabel(this.textFirstNameFr)).toBeVisible();
        await expect(this.page.getByLabel(this.textLastNameFr,
            { exact: true })).toBeVisible();
        await expect(this.page.getByLabel(this.textPhoneNumberFr,
            { exact: true })).toBeVisible();
        await expect(this.page.getByRole('combobox',
            { name: this.textProvinceFr })).toBeVisible();
        await expect(this.page.getByLabel(this.textEmailFr)).toBeVisible();
        await expect(this.page.getByLabel(this.textPasswordFr,
            { exact: true })).toBeVisible();
        await expect(this.page.locator(this.blockPasswordInstructions))
            .toBeVisible();
        await expect(this.page.getByLabel(this.textConfirmPasswordFr))
            .toBeVisible();
        await expect(this.page.getByRole('checkbox')).toBeVisible();
        await expect(this.page.locator(this.labelAgreement)).toBeVisible();
        await expect(await this.page.getByRole('button',
            { name: this.textCreateAccountFr })).toBeVisible();
    }

    async signUpEn (config: SignUpConfig): Promise<void> {
        await this.page.getByLabel(this.textFirstNameEn).fill(config.firstName);
        await this.page.getByLabel(this.textLastNameEn).fill(config.lastName);
        await this.page.getByLabel(this.textPhoneNumberEn,
            { exact: true }).fill(config.phone);
        await this.page.getByRole('combobox', { name: this.textProvinceEn })
            .selectOption({ label: config.region });
        await this.page.getByLabel(this.textEmailEn).fill(config.email);
        await this.page.getByLabel(this.textPasswordEn, { exact: true })
            .fill(this.userPassword);
        await this.page.getByLabel(this.textConfirmPasswordEn)
            .fill(this.userPassword);

        await this.page.getByRole('button',
            { name: this.textCreateAccountEn }).click();
    }

    async signUpFr (config: SignUpConfig): Promise<void> {
        await this.page.getByLabel(this.textFirstNameFr).fill(config.firstName);
        await this.page.getByLabel(this.textLastNameFr, { exact: true })
            .fill(config.lastName);
        await this.page.getByLabel(this.textPhoneNumberFr, { exact: true })
            .fill(config.phone);
        await this.page.getByRole('combobox', { name: this.textProvinceFr })
            .selectOption({ label: config.region });
        await this.page.getByLabel(this.textEmailFr).fill(config.email);
        await this.page.getByLabel(this.textPasswordFr, { exact: true })
            .fill(this.userPassword);
        await this.page.getByLabel(this.textConfirmPasswordFr)
            .fill(this.userPassword);

        await this.page.getByRole('button',
            { name: this.textCreateAccountFr }).click();
    }

    async verifyLoggedInEn (): Promise<void> {
        await expect(this.page.getByRole('link',
            { name: this.textMyPortfolioEn })).toBeVisible({ timeout: 20000, });
    }

    async verifyLoggedInFr (): Promise<void> {
        await expect(this.page.getByRole('link',
            { name: this.textMyPortfolioFr })).toBeVisible({ timeout: 20000, });
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
