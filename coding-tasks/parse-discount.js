// Given: string with discount notice "Congrats! You've received a 10% discount!"
// Task: provide a function that will take in string with discount notice and return discount value

let discountNotice = "Congrats! You've received a 10% discount!";

function parseDiscount (notice) {
    let arrayNotice = notice.replace(/[\.,:%!-]+/gi, '').split(' ');

    console.log(arrayNotice);

    let arrayDiscounts = arrayNotice.filter((value, index) => {
       return parseInt(value) > 0; 
    });

    return arrayDiscounts[0];
}

function parseDiscountRegex (notice) {
    return notice.match(/(\d+)% discount!$/gi)[0].replace('% discount!', '');
}

let discount = parseDiscount(discountNotice); // "10"

let discount2 = parseDiscountRegex(discountNotice); // "10"
