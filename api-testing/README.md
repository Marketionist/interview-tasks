# api-testing

Set of API tests to validate discounts

## Supported versions
Tested on [Node.js](http://nodejs.org/) 10.15.1

## Installation
1. Install [Node.js](http://nodejs.org/) 10.x.x (LTS)
2. Clone this repository
3. Go to api-testing folder: `cd api-testing/`
4. Install all dependencies: `npm install`
5. Run tests: `npm run test`

## Initial task
A sample test may look like:

```
Scenario: Orders with 11- 20 items receive a 5% discount
    Given I have 14 items in my order
    When I view the checkout summary
    Then there is a 5% discount applied
```

Feature:
Will will be offering discounts on larger quantities of orders according to the following schedule. The discount will
apply when viewing the order summary endpoint.

The endpoint is `/api/1.0/order_summary/{order_id}` and an example response model is:

```json
{
  "items": [{
      "name": "widget 1",
      "price": {
        "type": "USD",
        "value": 10.1
      },
      "quantity": 2
    },
    {
      "name": "widget 2",
      "price": {
        "type": "USD",
        "value": 4.2
      },
      "quantity": 6,
    }
  ]
  “order_total”: 45.4,
  “discount”: 0
}
```

- 0-10 items: 0% discount
- 11-20 items: 5% discount
- 20-30 items: 10% discount
- 31+ items: 20% discount

Please write test cases for the following feature and describe how you would automate testing. Please explain any
assumptions you made while writing tests.

## Assumptions
We have 4 ranges to test:

```
-----------------------o---------------------------o----------------------------o--------------------------
0-10 items: 0% discount    11-20 items: 5% discount    21-30 items: 10% discount    31+ items: 20% discount
```

Let's use:
- Boundary Value Analysis (testing between extreme ends + nominal values).
- Equivalence Partitioning (dividing the set of test conditions into a partition that can be considered the same).

### Boundary Value Analysis
In this case extreme ends and nominal values are: 10, 11, 15, 20, 21, 25, 30, 31. We can also add 2 edge cases: -1 and
9999.

### Equivalence Partitioning
In this case the assumption is that if one condition/value in a partition passes all others will also pass. This gives
us less test cases: 5, 15, 25, 35.

Let's assume that for now we have enough time to cover all Boundary Value Analysis cases (and we do not want to check them manually each time). The only corrections we will do - for now we will not check edge cases and nominal values (they can be easily covered later). So, we will go with 6 test cases for now: 10, 11, 20, 21, 30, 31.

## Notes
1. The input conditions have issue: 2 ranges have the same value 20 in them (11-20 items: 5%, 20-30 items: 10%) - so it
    looks like the item count intersection. We will assume that it should be 11-20 items: 5%, 21-30 items: 10%.
2. JSON was not valid:
    - 1.a. Excessive comma in `"quantity": 6,`.
    - 1.b. Missing comma before `"order_total": 45.4,`.
    - 1.c. Wrong quotes format around `“order_total”: 45.4, “discount”: 0`.
3. For `"I have (.*) items in my order"` and `"there is a (.*)% discount applied"` Regex was improved - from `(.*)` that
    parses any symbols to `(\d+)` that parses only digits.
4. For all steps had to add `... for order (\d+)` to get corresponding .json files from server.
5. To emulate application API responses we will use [node-testing-server](https://github.com/Marketionist/node-testing-server).
6. Test case `Then there is a 20% discount applied for order 31` is failing (expecting discount 20 and getting 99 instead) - it is
    done intentionally for demonstration purposes and can be fixed in `hooks.js` by editing `"discount": 99`.

## Thanks
If this script was helpful for you, please give it a **★ Star**
on [github](https://github.com/Marketionist/interview-tasks).
