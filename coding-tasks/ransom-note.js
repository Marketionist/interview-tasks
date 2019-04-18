// Given: there is a villain who stole a dog from a neighbor. He wants to write a ransom note, cutting out words from a
// newspaper
// Task: write a function that takes 2 strings (text of the newspaper, text of the note) and returns true if all the
// words from the note are in the text of the newspaper or false if there are not enough words

let textNewspaper = 'We think: this is a great column, we love you to read it with our dog.';
let textRansomNote = 'This is a dog we think you love';
let textRansomNoteWrong = 'dog we we we';

function hasAllRansomWords (txtNewspaper, txtRansomNote) {
    let arrayNewspaper = txtNewspaper.replace(/[\.,:-]+/g, '').toLowerCase().split(' ');
    let arrayRansomNote = txtRansomNote.replace(/[\.,:-]+/g, '').toLowerCase().split(' ');
    let result;

    arrayRansomNote.map((value, index) => {
        if (result !== false) {
            let indexWordArrayNewspaper = arrayNewspaper.indexOf(value);
            if (indexWordArrayNewspaper === -1) {
                result = false;
            } else {
                arrayNewspaper.splice(indexWordArrayNewspaper, 1);
                result = true;
                console.log(`Removed "${value}" at index ${indexWordArrayNewspaper}, now left:`, arrayNewspaper);
            }
        }
    })

    return result;
}

hasAllRansomWords(textNewspaper, textRansomNote); // true

hasAllRansomWords(textNewspaper, textRansomNoteWrong); // false
