import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ScheduleScanPage extends BasePage {
    private blockQaAutomationCenter = '//*[contains(@class, ' +
        '"location-card__name") and text()="QA Automation Center"]';
    private inputAdditionalBookingInformation = '//*[ancestor::*[contains(' +
        '@class, "additional-booking-info --desktop")] and ' +
        '@id="additionalBookingInformation"]';
    private iconNextMonth = '//*[ancestor::*[contains(@class, ' +
        '"calendar-title")] and @class="icon__arrow"]';
    private blockDay28 = '//*[ancestor::*[contains(@class, "vuecal__cell ") ' +
        'and not(contains(@class, "vuecal__cell--disabled"))] and text()="28"]';
    private blockTimeSlot1 = this.createBlockTimeSlotSelector(1);
    private blockTimeSlot2 = this.createBlockTimeSlotSelector(2);
    private blockTimeSlot3 = this.createBlockTimeSlotSelector(3);
    private buttonIUnderstand = '//*[ancestor::*[contains(@class, ' +
        '"--actions_offline_center")] and contains(., "I understand")]';

    private createBlockTimeSlotSelector (elementNumber: number) {
        return '(//*[ancestor::*[contains(@class, "appointments__list")] and ' +
            `contains(@class, "b2--bold")])[${elementNumber}]`;
    }

    constructor(page: Page) {
        super(page);
    }

    async scheduleScan () {
        await this.page.locator(this.blockQaAutomationCenter).click();
        await this.page.locator(this.inputAdditionalBookingInformation).fill(
            'Test');
        await this.page.locator(this.iconNextMonth).click();
        await this.page.locator(this.blockDay28).click();
        await this.page.locator(this.blockTimeSlot1).click();
        await this.page.locator(this.buttonIUnderstand).click();
        await this.page.locator(this.blockTimeSlot2).click();
        await this.page.locator(this.blockTimeSlot3).click();
        // await this.page.locator(this.inputPassword).fill(password);

        await expect(this.page.locator(this.buttonBookScan)).toBeVisible();
    }
}
