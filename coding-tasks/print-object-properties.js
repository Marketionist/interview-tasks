/**
 * [Javascript - Spread & Rest]
 *    => You initially have several function invocations (commented out to avoid initial errors)
 *    => We need you to programmatically:
 *      => Create "getObject" function
 *        => Allow the "getObject" function to receive ANY number of parameters
 *        => Enable "getObject" function to return an object that holds 2 keys: "numeric" & "string" 
 *        => Each of these keys will hold a SORTED ARRAY based on the parameters sent to the function
 *          => HINT: If you sent '222' as a parameter, IT SHOULD BE INCLUDED WITHIN THE "string" KEY!
 *          => HINT: If you sent 222 as a parameter, IT SHOULD BE INCLUDED WITHIN THE "numeric" KEY!
 *        => Using first invocation as example, it would return:
 *       
 *           {
 *              numeric: [2,3,4,5],
 *              string: [five,one,two]
 *           }
 *      
 *      => Finally, print the results nicely as <key in uppercase> => <array content>
 *        => Using the same example as above, it would print:
 *           
 *           NUMERIC   => 2,3,4,5
 *           STRING    => five,one,two
 * 
 *    => You must use the functions below!
 *    => HINT: HOISTING plays an important role on this exercise!
 */

console.log(`
///////////////////////////////////////////////////
Please read carefully the exercise instructions...
Happy coding!!
///////////////////////////////////////////////////
`);

/**
 * Gets an object that separates numeric and string values
 * === MUST REMAIN AS A FUNCTION EXPRESSION ===
 * === HANDLE THE PARAMETERS CAREFULLY ===
 */
function getObject () {
    let numbers = [];
    let strings = [];

    [...arguments].forEach((value) => {
        if (typeof value === 'number') {
            numbers.push(value);
        } else if (typeof value === 'string') {
            strings.push(value);
        } else {
            throw new Error('Argument type is not supported');
        }
    });

    const sortedNumbers = numbers.sort((a, b) => a - b);
    const sortedStrings = strings.sort();

    return {
        numeric: sortedNumbers,
        string: sortedStrings
    }
}

/**
 * Prints the object nicely
 * === MUST REMAIN AS A FUNCTION EXPRESSION ===
 * === HANDLE THE PARAMETERS CAREFULLY ===
 */
const prettyPrintObject = (numbersStringsObject) => {
    for (const [key, value] of Object.entries(numbersStringsObject)) {
        console.log(`${key.toUpperCase()}: ${value}`);
    }
};

console.log('='.repeat(50));
prettyPrintObject(getObject('one', 2, 'two', 3, 4, 5, 'five'));
// NUMERIC: 2,3,4,5
// STRING: five,one,two
console.log('='.repeat(50));
prettyPrintObject(getObject('John', 666, 32, 6, 'Elsa', '3', 'Atreus'));
// NUMERIC: 6,32,666
// STRING: 3,Atreus,Elsa,John
console.log('='.repeat(50));
prettyPrintObject(getObject('Mazda', 3, 'Ford', 122, 'Shelby', 500, 'Porsche', 911, 'Aston Martin', 90));
// NUMERIC: 3,90,122,500,911
// STRING: Aston Martin,Ford,Mazda,Porsche,Shelby
console.log('='.repeat(50));
// ==================================================


