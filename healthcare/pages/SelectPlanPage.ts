import { Page, } from '@playwright/test';
import { BasePage } from './BasePage';

export class SelectPlanPage extends BasePage {
    public blockMriScan = this.createBlockScanSelector('MRI Scan');
    public blockHeartLungsCtScan = this.createBlockScanSelector(
        'Heart & Lungs CT Scan');

    private createBlockScanSelector (scanName: string): string {
        return '//*[ancestor::*[contains(@class, "encounter-list-item") and ' +
            'not(contains(@style, "display: none;"))] and ' +
            `text()="${scanName}"]`;
    }
    private createBlockQuestionnaireAnswerSelector (
        labelText: string, answerText: string
    ): string {
        return '(//*[ancestor::*[contains(@class, "options-container") and ' +
            `preceding-sibling::*[contains(., "${labelText}")]] and ` +
            `contains(text(), "${answerText}")])[1]`;
    }

    private textChestPain = 'Chest pain';
    private textStent = 'cardiac stent';
    private textPacemaker = 'pacemaker';
    private textHistory = 'a history of';
    private textCalciumScore = 'calcium score greater than 10';
    private textYes = 'Yes';
    private buttonBookScan = '//*[ancestor::*[contains(@class, ' +
        '"section-header")] and contains(., "Book a scan")]';
    private blockAddonHeartLungsCtScan = '//*[ancestor::*[contains(@id, ' +
        '"addon")] and text()="Heart & Lungs CT Scan"]';
    private blockChestPainYes = this.createBlockQuestionnaireAnswerSelector(
        this.textChestPain, this.textYes);
    private blockStentYes = this.createBlockQuestionnaireAnswerSelector(
        this.textStent, this.textYes);
    private blockPacemakerYes = this.createBlockQuestionnaireAnswerSelector(
        this.textPacemaker, this.textYes);
    private blockHistoryYes = this.createBlockQuestionnaireAnswerSelector(
        this.textHistory, this.textYes);
    private blockCalciumScoreYes = this.createBlockQuestionnaireAnswerSelector(
        this.textCalciumScore, this.textYes);

    private buttonSubmit = '//*[ancestor::*[contains(@class, ' +
        '"pre-screen-modal__btn-container")] and not(contains(@class, ' +
        '"--appear-disabled"))]';
    private buttonContinueWithoutCalcium = '//*[ancestor::*[contains(@class, ' +
        '"pre-screen-modal__btn-container")] and not(contains(@class, ' +
        '"--appear-disabled")) and contains(., ' +
        '"Continue Without Heart Calcium")]';

    constructor(page: Page) {
        super(page);
    }

    async selectPlan (blockSelector: string): Promise<void> {
        await this.page.locator(this.buttonBookScan).click();
        await this.page.locator(blockSelector).click();
        await this.page.locator(this.buttonContinue).click();

        const blockChestPainYes = this.page.locator(this.blockChestPainYes);

        if (await blockChestPainYes.isVisible()) {
            await blockChestPainYes.click();
            await this.page.locator(this.blockStentYes).click();
            await this.page.locator(this.blockPacemakerYes).click();
            await this.page.locator(this.blockHistoryYes).click();
            await this.page.locator(this.blockCalciumScoreYes).click();

            await this.page.locator(this.buttonSubmit).click();
            await this.page.locator(this.buttonContinueWithoutCalcium).click();
        }
    }

    async selectPlanWithAddon (blockSelector: string): Promise<void> {
        await this.page.locator(this.buttonBookScan).click();
        await this.page.locator(blockSelector).click();
        await this.page.locator(this.blockAddonHeartLungsCtScan).click();
        await this.page.locator(this.buttonContinue).click();

        await this.page.locator(this.blockChestPainYes).click();
        await this.page.locator(this.blockStentYes).click();
        await this.page.locator(this.blockPacemakerYes).click();
        await this.page.locator(this.blockHistoryYes).click();
        await this.page.locator(this.blockCalciumScoreYes).click();

        await this.page.locator(this.buttonSubmit).click();
        await this.page.locator(this.buttonContinueWithoutCalcium).click();
    }
}
