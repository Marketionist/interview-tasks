// Task: write a function that takes a string with characters as an input
// and returns the object with number of occurances for each character

let stringSample1 = 'eeeooriooi';
let stringSample2 = 'You\'ve got 10% off!';

function countCharacters (string) {
    let objectCharactersCount = {};

    string.split('').map((value, index) => {
        if (objectCharactersCount.hasOwnProperty(value)) {
            objectCharactersCount[value] += 1;
        } else {
            objectCharactersCount[value] = 1;
        }
    });

    return objectCharactersCount;
}

let charactersStringSample1 = countCharacters(stringSample1);
// {e: 3, o: 4, r: 1, i: 2}

let charactersStringSample2 = countCharacters(stringSample2);
// {0: 1, 1: 1, Y: 1, o: 3, u: 1, ': 1, v: 1, e: 1, " ": 3, g: 1, t: 1, %: 1, f: 2, !: 1}
