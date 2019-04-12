const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');
const request = require('request');

Given(/^I have (\d+) items in my order (\d+)$/, function (numberItems, numberOrder, done) {
    // Call native app to do something like: this.orderApi.CreateOrder();
    // Here we emulate it by requesting .json file
    request(`http://localhost:3001/api/1.0/order_summary/${numberOrder}.json`, function (error, response, body) {
        if (error) {
            done(error);
        } else {
            // Validate number of items here? For example:
            let totalItems = 0;
            let responseBody = JSON.parse(body);

            responseBody.items.map((value, index) => {
                totalItems += responseBody.items[index].quantity;
            });

            expect(totalItems).to.eql(numberItems);

            done();
        }
    });
});

When(/^I view the checkout summary for order (\d+)$/, function (numberOrder, done) {
    // Call native app to do something like: this.order = this.orderApi.GetOrder();
    // Here we emulate it by requesting .json file
    request(`http://localhost:3001/api/1.0/order_summary/${numberOrder}.json`, function (error, response, body) {
        if (error) {
            done(error);
        } else {
            // Validate order_total here? For example:
            let responseBody = JSON.parse(body);

            expect(responseBody.order_total).to.be.above(0);

            done();
        }
    });
});

Then(/^there is a (\d+)% discount applied for order (\d+)$/, function (numberDiscount, numberOrder, done) {
    request(`http://localhost:3001/api/1.0/order_summary/${numberOrder}.json`, function (error, response, body) {
        // console.log('Response status code:', response && response.statusCode);
        // console.log('Response body:', body);
        if (error) {
            done(error);
        } else {
            let responseBody = JSON.parse(body);

            expect(responseBody.discount).to.eql(numberDiscount);

            done();
        }
    });
});
