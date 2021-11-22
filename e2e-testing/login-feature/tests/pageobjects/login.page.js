const Page = require('./page.js');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername() {
        return $('[data-e2e="loginGuidOrEmail"]');
    }

    get buttonContinue() {
        return $('button[type="submit"]');
    }

    get blockVerifyDevice() {
        return $('//*[contains(text(), "Verify Your Device")]');
    } 

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.buttonContinue.click();
    }

}

module.exports = new LoginPage();
