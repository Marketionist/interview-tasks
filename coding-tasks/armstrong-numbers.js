// Given: 153
// Task: write a function that takes a number as input and returns true if this number is an Armstrong number or false
// if it is not
// Armstrong number or narcissistic number: in recreational number theory, a narcissistic number is a number that is the
// sum of its own digits each raised to the power of the number of digits

function isArmstrongNumber (number) {
    let arrayDigits = number.toString().split('');

    let constructedNumber = arrayDigits.reduce((accumulator, value, index) => {
        return accumulator + Math.pow(value, arrayDigits.length);
    }, 0);

    if (constructedNumber === number) {
        console.log(`${number} is Armstrong number`);
    } else {
        console.log(`${number} is not Armstrong number`);
    }

    return constructedNumber === number;
}

isArmstrongNumber(371); // 371 is Armstrong number // true

isArmstrongNumber(475); // 475 is not Armstrong number // false
