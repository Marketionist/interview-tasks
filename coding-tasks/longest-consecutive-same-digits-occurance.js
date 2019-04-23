// Task: write a function that takes an array of zeros and ones as input and returns the maximum number of consecutive
// zeros or ones

let allDigits0 = [0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0];
let allDigits1 = [0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1];

function findLongestConsecutiveDigits (arrayDigits) {
    let temporaryResult = 0;
    let globalResult = 0;
    let lengthArrayDigits = arrayDigits.length;

    for (let i = 1; i < lengthArrayDigits; i++) {
        if (arrayDigits[i] === arrayDigits[i - 1]) {
            temporaryResult++;
            if (globalResult < temporaryResult) {
                globalResult = temporaryResult;
            }
        } else {
            temporaryResult = 1;
        }
        console.log(`Temporary accumulator: ${temporaryResult}`);
        console.log(`Global accumulator: ${globalResult}`);
    }

    return globalResult;
}

findLongestConsecutiveDigits(allDigits0); // 4

findLongestConsecutiveDigits(allDigits1); // 5
