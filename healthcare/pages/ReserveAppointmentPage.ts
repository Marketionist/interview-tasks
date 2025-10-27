import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ReserveAppointmentPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async reserveAppointment () {
        // await this.page.locator(this.iconNextMonth).click();

        // await expect(this.page.locator(this.buttonBookScan)).toBeVisible();
    }
}
