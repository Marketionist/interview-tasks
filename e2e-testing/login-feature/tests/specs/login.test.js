const LoginPage = require('../pageobjects/login.page.js');

describe('Blockchain Wallet application', () => {
    it(
        'should show verify device notification while logging in with valid credentials',
        async () => {
            await LoginPage.open('/en/#/login');
            await LoginPage.login('ccoaiqju@sharklasers.com', '5555TEST+');

            await expect(LoginPage.blockVerifyDevice).toBeDisplayed();
        }
    );
});


