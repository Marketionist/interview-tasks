'use strict';

// #############################################################################

const {
    CONFIRM_CLIENT_NAME,
    GREETINGS,
    CONFIRMATIONS,
    FINAL_MESSAGE,
    CONFIRM_CLIENT_NUMBER
} = require('./messages/messages.js');

// General functions

/**
 * Returns final message when called with particular incoming text strings
 * @param {string} incomingMessage
 * @returns {string} Final message
 */
function deliverFinalMessage (incomingMessage) {
    if (CONFIRMATIONS.includes(incomingMessage)) {
        return FINAL_MESSAGE;
    }
}

// Phone call emulation functions

/**
 * Returns confirm client name message when called with particular incoming text
 * strings
 * @param {string} incomingMessage
 * @returns {string} Confirm client name message
 */
function confirmClientName (incomingMessage) {
    if (GREETINGS.includes(incomingMessage)) {
        return CONFIRM_CLIENT_NAME;
    }
}

// SMS message chain emulation functions

/**
 * Returns confirm client number message when called without any incoming text
 * strings
 * @param {string} incomingMessage
 * @returns {string} Confirm client number message
 */
function confirmClientNumber (incomingMessage) {
    if (!incomingMessage) {
        return CONFIRM_CLIENT_NUMBER;
    }
}

module.exports = {
    deliverFinalMessage,
    confirmClientName,
    confirmClientNumber
};
