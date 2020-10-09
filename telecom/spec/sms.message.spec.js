'use strict';

// #############################################################################

const { deliverFinalMessage, confirmClientNumber } = require('../index.js');
const {
    CONFIRM_CLIENT_NUMBER,
    FINAL_MESSAGE
} = require('../messages/messages.js');

describe('Test SMS message chain', () => {

    it(
        'If the input is empty - the output should be ' +
        `"${CONFIRM_CLIENT_NUMBER}"`,
        () => {
            const confirmClientNumberMessage = confirmClientNumber();

            expect(confirmClientNumberMessage).toEqual(CONFIRM_CLIENT_NUMBER);
        }
    );

    it(
        `If the input is "👍" - the output should be "${FINAL_MESSAGE}"`,
        () => {
            const finalMessage = deliverFinalMessage('👍');

            expect(finalMessage).toEqual(FINAL_MESSAGE);
        }
    );

});
