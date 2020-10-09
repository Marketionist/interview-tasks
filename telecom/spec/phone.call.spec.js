'use strict';

// #############################################################################

const { deliverFinalMessage, confirmClientName } = require('../index.js');
const {
    CONFIRM_CLIENT_NAME,
    FINAL_MESSAGE
} = require('../messages/messages.js');

describe('Test phone call', () => {

    it(
        'If the input is "Hello?" - the output should be ' +
            `"${CONFIRM_CLIENT_NAME}"`,
        () => {
            const confirmClientNameMessage = confirmClientName('Hello?');

            expect(confirmClientNameMessage).toEqual(CONFIRM_CLIENT_NAME);
        }
    );

    it(
        'If the input is "This is he." - the output should be ' +
            `"${FINAL_MESSAGE}"`,
        () => {
            const finalMessage = deliverFinalMessage('This is he.');

            expect(finalMessage).toEqual(FINAL_MESSAGE);
        }
    );

});
