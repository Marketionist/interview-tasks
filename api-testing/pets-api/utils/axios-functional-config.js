'use strict';

const axios = require('axios');
const axiosRetry = require('axios-retry');

module.exports = {

    /**
    * Creates axios client instance with baseURL
    * @param {String} url - id for a new pet
    * @returns {Object} - axios client instance with baseURL
    */
     setAxiosBaseUrl (url) {
        // Set base URL for axios requests
        return axios.create({ baseURL: url });
    },

    /**
    * Enables axios retry with predefined settings
    * @param {Object} client - axios client instance
    * @param {Number} retries - number of retries to perform
    * @param {Number} retryInterval - time interval between retries in ms
    */
    enableAxiosRetry (client, retries, retryInterval) {
        axiosRetry(client, {
            retries: retries,
            retryDelay: (retryCount) => {
                console.log(`Retry attempt: ${retryCount}`);
                return retryCount * retryInterval; // Interval between retries
            },
            retryCondition: (error) => {
            // If retry condition is not specified, by default idempotent
            // requests are retried (if an identical request can be made once or
            // several times in a row with the same effect while leaving the
            // server in the same state)
            return error.response.status === 404;
            }
        });
    }

};
