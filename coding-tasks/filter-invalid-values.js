// Given: list of discounts [-1, 2, 10, 110, 55, 100, 44, 999]. Valid discount range is 0-100
// Task: provide a function that will take in the discounts array and return invalid discounts array

let allDiscounts = [-1, 2, 10, 110, 55, 100, 44, 999];

function findInvalidDiscounts (arrayDiscounts) {
    return arrayDiscounts.filter((value, index) => value < 0 || value > 100);
}

let invalidDiscounts = findInvalidDiscounts(allDiscounts); // [-1, 110, 999]

console.log('The invalid discounts are:', invalidDiscounts); // The invalid discounts are: [-1, 110, 999]
