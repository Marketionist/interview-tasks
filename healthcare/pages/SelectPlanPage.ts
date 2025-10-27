import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SelectPlanPage extends BasePage {
    public blockMriScan = this.createBlockScanSelector('MRI Scan');
    public blockHeartLungsCtScan = this.createBlockScanSelector(
        'Heart & Lungs CT Scan');

    private buttonBookScan = '//*[ancestor::*[contains(@class, ' +
        '"section-header")] and contains(., "Book a scan")]';
    private buttonContinue = '//*[contains(@data-test, "submit") and ' +
        'not(contains(@class, "--appear-disabled"))]';
    private blockAddonHeartLungsCtScan = '//*[ancestor::*[contains(@id, ' +
        '"addon")] and text()="Heart & Lungs CT Scan"]';

    private createBlockScanSelector (scanName: string) {
        return '//*[ancestor::*[contains(@class, "encounter-list-item") and ' +
            `not(contains(@style, "display: none;"))] and text()="${scanName}"]`;
    }

    constructor(page: Page) {
        super(page);
    }

    async selectPlan (blockSelector: string) {
        await this.page.locator(this.buttonBookScan).click();
        await this.page.locator(blockSelector).click();
        await this.page.locator(this.buttonContinue).click();
    }

    async selectPlanWithAddon (blockSelector: string) {
        await this.page.locator(this.buttonBookScan).click();
        await this.page.locator(blockSelector).click();
        await this.page.locator(this.blockAddonHeartLungsCtScan).click();
        await this.page.locator(this.buttonContinue).click();
    }
}
