# pets-api

A set of API tests to validate pets

## Supported versions
Should work on any [Node.js](http://nodejs.org/) version >=10.13.x. Tested on
Node.js 16.13.0.

## Installation
1. Install [Node.js](http://nodejs.org/) 16.x.x (LTS)
2. Clone this repository
3. Go to api-testing folder: `cd api-testing/pets-api`
4. Install all dependencies: `npm install`
5. Run tests: `npm test`

## Initial task
Please use the following Swagger document to complete your task:
https://petstore.swagger.io/.
1. Use the POST /pet endpoint to create a new pet with the following criteria:
  a. A unique ID
  b. At least 1 category
  c. A unique name
  d. At least 2 tags
  e. Status: Available
2. Use the GET /pet/{petId} to search for the newly created pet
  in step 1, and verify the properties in the returned payload
  are all correct.
3. Delete the pet.
4. Verify the pet no longer exists.

## Notes
1. In this solution I'm using [js-automation-tools](https://github.com/Marketionist/js-automation-tools)
  package that I created and open sourced. Here it's utilized to generate a unique string of 13+ digits.
2. It looks like the server for https://petstore.swagger.io/v2 is
  quite flaky or has some load balancing enabled (quite often 404
  is returned instead of a proper response), so to make tests
  more stable I had to introduce `axios-retry` and bump up
  `jest` tests timeout from 5000 ms to 40000 ms.
3. Configuration for `axios` and `axios-retry` can be set in
  one of two styles:
    - Functional: [axios-functional-config.js]();
      ```javascript
      const { setAxiosBaseUrl, enableAxiosRetry } = require(
          '../utils/axios-functional-config.js'
      );

      // Configire axios
      const baseUrl = 'https://petstore.swagger.io/v2';
      const retriesNumber = 3;
      const retryInterval = 3000;
      const axiosClient = setAxiosBaseUrl(baseUrl);
      enableAxiosRetry(axiosClient, retriesNumber, retryInterval);
      ```
    - OOP: [axios-oop-config.js]();
      ```javascript
      const AxiosConfig = require('../utils/axios-oop-config.js');

      // Configire axios
      const baseUrl = 'https://petstore.swagger.io/v2';
      const retriesNumber = 3;
      const retryInterval = 3000;
      const axiosClient = new AxiosConfig(baseUrl, retriesNumber, retryInterval);
      ```

## Thanks
If this script was helpful for you, please give it a **★ Star**
on [GitHub](https://github.com/Marketionist/interview-tasks).
