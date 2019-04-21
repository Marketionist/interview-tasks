// Task: write a function that takes a number as input and returns true if this number is prime (is divided only on one
// and itself) or false if it is not

const isPrime = (number) => {
    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return number > 1;
}

// We can also decrease the complexity of the algorithm from O(n) to O(sqrt(n)) if we run the loop until square root
// of a number:

const isPrimeEnhanced = (number) => {
    let numberSquareRoot = Math.sqrt(number);

    for (let i = 2; i <= numberSquareRoot; i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return number > 1;
}

isPrimeEnhanced(47); // true

isPrimeEnhanced(999); // false
