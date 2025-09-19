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


// Additional task: output characters in the format: 'aaa3bb2cccc4d'

function formatCharactersOutput (objectCountedCharacters) {
    const entries = Object.entries(objectCountedCharacters);
    // entries will be: [['e', 3], ['o', 4], ['r', 1], ['i', 2]]
    let result = '';

    entries.map((value, index) => {
        let character = value[0];
        let repetitionsNumber = value[1];

        if (repetitionsNumber > 1) {
            result += character.repeat(repetitionsNumber) + repetitionsNumber;
        } else {
            result += character;
        }
    });

    return result;
}

let charactersStringSample3 = formatCharactersOutput(countCharacters(stringSample1));
// 'eee3oooo4rii2'

let charactersStringSample4 = formatCharactersOutput(countCharacters(stringSample2));
// '01Yooo3u've   3gt%ff2!'

