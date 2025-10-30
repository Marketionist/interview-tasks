import { Page, } from '@playwright/test';
import { BasePage } from './BasePage';

export class ReserveAppointmentPage extends BasePage {
    private iframeStripe = 'iframe[title="Secure payment input frame"]:not(' +
        '[aria-hidden="true"])';
    private inputCardNumber = '#Field-numberInput';
    private inputExpirationDate = '#Field-expiryInput';
    private inputSecurityCode = '#Field-cvcInput';
    private selectCountry = '#Field-countryInput';
    private inputPostalCode = '#Field-postalCodeInput';

    constructor(page: Page) {
        super(page);
    }

    async reserveAppointment (): Promise<void> {
        const iframeLocator = this.page.frameLocator(this.iframeStripe);
        const inputCardInIframe = iframeLocator.locator(this.inputCardNumber);
        const inputExpirationInIframe = iframeLocator.locator(
            this.inputExpirationDate);
        const inputSecurityInIframe = iframeLocator.locator(
            this.inputSecurityCode);
        const selectCountryInIframe = iframeLocator.locator(this.selectCountry);
        const inputPostalInIframe = iframeLocator.locator(this.inputPostalCode);

        await inputCardInIframe.fill('4242 4242 4242 4242');
        await inputExpirationInIframe.fill('12 / 34');
        await inputSecurityInIframe.fill('567');
        await selectCountryInIframe.selectOption({ label: 'United States' });
        await inputPostalInIframe.fill('12345');
        await this.page.locator(this.buttonContinue).click();
    }
}
