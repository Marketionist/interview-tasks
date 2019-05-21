// Task: write a function that takes an array with arrays of strings as an input
// and returns the array of joined strings

let arraySample1 = [['A', 'B', 'C', 'D'], ['E', 'F', 'G', 'H']];
let arraySample2 = [['AA', 'Bb', 'Cc', 'dD', 'AA'], ['S', 'a', 'm', 'p', 'l', 'e'], ['w', 'o', 'r', 'd']];

function joinArrayStrings (stringsArray) {
    return stringsArray.map((value, index) => { return value.join(''); });
}

let joinSampleArray1 = joinArrayStrings(arraySample1); // ["ABCD", "EFGH"]
let joinSampleArray2 = joinArrayStrings(arraySample2); // ["AABbCcdDAA", "Sample", "word"]
