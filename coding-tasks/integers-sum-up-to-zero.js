// Given: an integer n
// Task: return any array containing n unique integers such that
// they add up to 0

// Example:
// n = 1 -> [0]
// n = 2 -> [-1, 1]
// n = 3 -> [-1, 1, 0]
// n = 11 -> [-1, 1, -2, 2, -3, 3, -4, 4, -5, 5, 0]

function sumToZero (n) {
    let resultsArray = [];

    if (n % 2 === 0) {
        const integer = n / 2;

        for (i = 1; i <= integer; i++) {
            resultsArray.push(-i, i);
        }
    } else {
        const integer = (n - 1) / 2;

        for (i = 1; i <= integer; i++) {
            resultsArray.push(-i, i);
        }
        resultsArray.push(0);
    }

    return resultsArray;
}

sumToZero(1); // [0]
sumToZero(2); // [-1, 1]
sumToZero(3); // [-1, 1, 0]
sumToZero(11); // [-1, 1, -2, 2, -3, 3, -4, 4, -5, 5, 0]
