'use strict';

// #############################################################################

let searchPage = {

    urlMainPage: process.env.URL_MAIN_PAGE || 'https://demo.nopcommerce.com',

    inputCentralSearch: '#q',
    buttonCentralSearch: '.search-input [type="submit"]',
    blockSearchResultsGrid: '.search-results .product-grid',
    checkboxAdvancedSearch: '#adv',
    dropdownCategory: '#cid',
    optionGiftCards: 'Gift Cards',
    dropdownManufacturer: '#mid',
    inputPriceFrom: '#pf',
    inputPriceTo: '#pt',

    textA: 'a',
    textNok: 'nok',
    textNoSuchProduct: 'nosuchproductnow&ever123',
    textGiftCard: 'gift card',
    text50: '50',
    text75: '75',
    textNokia1020: 'Nokia Lumia 1020'

};

function createBlockProductPriceSelector (text) {
    return `//*[ancestor::*[contains(@class, "product-item")] and contains(
        @class, "actual-price") and contains(text(), "${text}")]`;
}

searchPage.urlSearch = `${searchPage.urlMainPage}/search`;
searchPage.urlNokia1020 = `${searchPage.urlMainPage}/nokia-lumia-1020`;

searchPage.blockNoResults = `//*[@class="no-result" and contains(text(),
    "No results for ${searchPage.textNoSuchProduct}")]`;

// Gift cards product elements
searchPage.blockProductPrice100 = createBlockProductPriceSelector('$100.00');
searchPage.blockProductPrice50 = createBlockProductPriceSelector('$50.00');
searchPage.blockProductPrice25 = createBlockProductPriceSelector('$25.00');

// Nokia 1020 product elements
searchPage.imageNokia1020 = `.search-results img[title*=
    "${searchPage.textNokia1020}"]`;
searchPage.blockProductNameNokia1020 = `//a[ancestor::*[contains(@class,
    "search-results")] and contains(text(), "${searchPage.textNokia1020}")]`;

module.exports = searchPage;
