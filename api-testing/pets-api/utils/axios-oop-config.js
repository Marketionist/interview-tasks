'use strict';

const axios = require('axios');
const axiosRetry = require('axios-retry');

module.exports = class AxiosClient {

    constructor(url, retries, retryInterval) {
        // Set base URL for axios requests
        this.client = axios.create({ baseURL: url });
        this.axiosRetryConfig = axiosRetry(this.client, {
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

        return this.client;
    }

};
