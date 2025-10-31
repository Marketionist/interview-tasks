import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { LogInPage } from './LogInPage';

export class AppointmentsPage extends BasePage {
    public textMaleMriScan = 'Male MRI Scan';
    public textLungsCtScan = 'Lungs CT Scan';

    private createButtonSortStartSelector (sortState: string): string {
        return `[title="Sort by Start Time"][aria-sort="${sortState}"]`;
    }
    private createblockFirstLineSelector (dataField: string): string {
        return '(//span[ancestor::*[contains(@data-field, ' +
            `"${dataField}")]])[1]`;
    }

    private buttonBeginMedicalQuestionnaire = '//*[ancestor::*[contains(' +
        '@class, "confirmation-msg")] and contains(., ' +
        '"Begin Medical Questionnaire")]';
    private timeout30Seconds = 30000;
    private timeout4Minutes = 240000;
    private linkMenuAppointments = '.menu-items [href="/appointments"]';
    private inputSearchAppointments = '#appointmentSearch';
    private buttonRefreshData = '[title="Refresh data"]';
    private buttonSortStartTimeNone = this.createButtonSortStartSelector(
        'none');
    private buttonSortStartTimeAscending = this.createButtonSortStartSelector(
        'ascending');
    private blockFirstLineAppointmentType = this.createblockFirstLineSelector(
        'type');
    private blockFirstLineCenterName = this.createblockFirstLineSelector(
        'center.physicianOrderName');
    private blockFirstLineStatus = this.createblockFirstLineSelector('status');

    constructor (page: Page) {
        super(page);
    }

    async verifyAppointment (appointmentType: string): Promise<void> {
        const logInPage = new LogInPage(this.page);

        await expect(this.page.locator(this.buttonBeginMedicalQuestionnaire))
            .toBeVisible({ timeout: this.timeout30Seconds, });
        await logInPage.logIn(
            logInPage.urlUserPortal,
            logInPage.userEmail,
            logInPage.userPassword
        );
        await this.page.locator(this.linkMenuAppointments).click();
        await this.page.locator(this.inputSearchAppointments).fill(
            logInPage.memberEmail);
        // Sort most recent appointment to the top
        await this.page.locator(this.buttonSortStartTimeNone).click();
        await this.page.locator(this.buttonSortStartTimeAscending).click();
        // Retryable closure to execute repeatedly until the assertion passes
        await expect(async () => {
            await this.page.locator(this.buttonRefreshData).click();

            await expect(this.page.locator(this.blockFirstLineAppointmentType))
                .toHaveText(
                    appointmentType, { timeout: this.timeout30Seconds, }
                );

        }).toPass({ timeout: this.timeout4Minutes, });
        await expect(this.page.locator(this.blockFirstLineCenterName))
            .toContainText('QA Automation MO');
        await expect(this.page.locator(this.blockFirstLineStatus))
            .toContainText('Pending');
    }
}
