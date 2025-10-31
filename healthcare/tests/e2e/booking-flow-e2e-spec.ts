import { test } from '@playwright/test';
import { LogInPage } from '../../pages/LogInPage';
import { SelectPlanPage } from '../../pages/SelectPlanPage';
import { ScheduleScanPage } from '../../pages/ScheduleScanPage';
import { ReserveAppointmentPage } from '../../pages/ReserveAppointmentPage';
import { AppointmentsPage } from '../../pages/AppointmentsPage';

test.describe('Booking flow', () => {

    test.beforeEach(async ({ page, context, }) => {
        const logInPage = new LogInPage(page);

        await logInPage.logIn(
            logInPage.urlMemberPortal,
            logInPage.memberEmail,
            logInPage.memberPassword
        );
    });

    test(
        'Schedule MRI Scan - appointment should be displayed in the User ' +
            'Facing Portal.',
        async ({ page, }) => {
            const selectPlanPage = new SelectPlanPage(page);
            const scheduleScanPage = new ScheduleScanPage(page);
            const reserveAppointmentPage = new ReserveAppointmentPage(page);
            const appointmentsPage = new AppointmentsPage(page);

            await selectPlanPage.selectPlan(selectPlanPage.blockMriScan);
            await scheduleScanPage.scheduleScan();
            await reserveAppointmentPage.reserveAppointment();
            await appointmentsPage.verifyAppointment(
                appointmentsPage.textMaleMriScan);
        }
    );

    test(
        'Schedule Heart & Lungs CT Scan with all "Yes" in the questionnaire -' +
            ' appointment should be displayed in the User Facing Portal.',
        async ({ page, }) => {
            const selectPlanPage = new SelectPlanPage(page);
            const scheduleScanPage = new ScheduleScanPage(page);
            const reserveAppointmentPage = new ReserveAppointmentPage(page);
            const appointmentsPage = new AppointmentsPage(page);

            await selectPlanPage.selectPlan(
                selectPlanPage.blockHeartLungsCtScan);
            await scheduleScanPage.scheduleScan();
            await reserveAppointmentPage.reserveAppointment();
            await appointmentsPage.verifyAppointment(
                appointmentsPage.textLungsCtScan);
        }
    );

    test(
        'Schedule MRI Scan with Heart & Lungs CT Scan add-on with all "Yes" ' +
            'in the questionnaire - appointment should be displayed in the ' +
            'User Facing Portal.',
        async ({ page, }) => {
            const selectPlanPage = new SelectPlanPage(page);
            const scheduleScanPage = new ScheduleScanPage(page);
            const reserveAppointmentPage = new ReserveAppointmentPage(page);
            const appointmentsPage = new AppointmentsPage(page);

            await selectPlanPage.selectPlanWithAddon(
                selectPlanPage.blockMriScan);
            await scheduleScanPage.scheduleScan();
            await reserveAppointmentPage.reserveAppointment();
            await appointmentsPage.verifyAppointment(
                appointmentsPage.textMaleMriScan);
        }
    );

});
