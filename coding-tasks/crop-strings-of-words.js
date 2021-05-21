// Task: crop a string of words separated by spaces to a new desired length.
// Return the longest string possible without ending with white space and
// partial words. Input will not start or end with spaces. If rules cannot be
// met - just return an empty string.

// Example:
// "Hello World", length = 5 -> "Hello"
// "Hello World", length = 8 -> "Hello"
// "Foo", length = 5 -> "Foo"
// "Foo Bar", length = 4 -> "Foo"

function cropStringOfWords (stringOfWords, numberOfChars) {
    const arrayOfWords = stringOfWords.split(' ');
    let resultSentence = arrayOfWords.shift();

    if (resultSentence.length > numberOfChars) {
        return '';
    }

    arrayOfWords.map((word) => {
        if (resultSentence.length + 1 + word.length <= numberOfChars) {
            resultSentence = resultSentence + ` ${word}`;
        }
    });

    return resultSentence;
}

cropStringOfWords('Hello World', 5); // "Hello"
cropStringOfWords('Hello World', 8); // "Hello"
cropStringOfWords('Hello World', 11); // "Hello World"
