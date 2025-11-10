// Task: given an array of integers and a target sum, check if there are
// two distinct numbers in the array whose sum equals the target.

// boolean hasPairWithSum(int[] array, int target);

// For example:
// Input: [1, 2, 3, 9], Target: 8
// Output: false

// Input: [1, 2, 3, 9], Target: 5
// Output: true


function targetSum (numbersArray, targetSum) {
    let resultsArray = [];

    for (i = 0; i < numbersArray.length; i++) {
        for (j = i + 1; j < numbersArray.length; j++) {
            let sum = numbersArray[i] + numbersArray[j];

            resultsArray.push(sum);
        }
    }

    return resultsArray.includes(targetSum);
}

const numbersArray1Result = targetSum([1, 2, 3, 9], 8);
// false
const numbersArray2Result = targetSum([1, 2, 3, 9], 5);
// true
const numbersArray3Result = targetSum([1, 4, 3, 2], 6);
// true
const numbersArray4Result = targetSum([1, 2, 3, 9], 14);
// false
