Feature: Search
  As a user of search feature
  I should be able to use search
  to get products


  Scenario Outline: Search for "<keyword>" in the central Search item input - search result should be displayed
    Given user goes to urlSearch from search-page
    When user types <text> from search-page in inputCentralSearch from search-page
    And user clicks buttonCentralSearch from search-page
    Then blockSearchResultsGrid from search-page should be present

  Examples: 
    | keyword | text    |
    | a       | textA   |
    | nok     | textNok |

  Scenario: Search for "nosuchproductnow&ever123" in the central Search item input - blue notification "No results for {search_criteria}." should be displayed
    Given user goes to urlSearch from search-page
    When user types textNoSuchProduct from search-page in inputCentralSearch from search-page
    And user clicks buttonCentralSearch from search-page
    Then blockNoResults from search-page should be present

  Scenario: Search for "gift card" in the central Search item input - 3 products with prices 25, 50, 75 should be displayed
    Given user goes to urlSearch from search-page
    When user types textGiftCard from search-page in inputCentralSearch from search-page
    And user clicks buttonCentralSearch from search-page
    Then blockProductPrice100 from search-page should be present
    And blockProductPrice50 from search-page should be present
    And blockProductPrice25 from search-page should be present

  Scenario: Search for "gift card" in the central Search item input, set Category to Gift Cards, set Price range from 50 to 75 - 1 product with price 50 should be displayed
    Given user goes to urlSearch from search-page
    When user types textGiftCard from search-page in inputCentralSearch from search-page
    And user clicks checkboxAdvancedSearch from search-page
    And user selects optionGiftCards from search-page in dropdownCategory from search-page
    And user types text50 from search-page in inputPriceFrom from search-page
    And user types text75 from search-page in inputPriceTo from search-page
    And user clicks buttonCentralSearch from search-page
    Then blockProductPrice50 from search-page should be present
    And blockProductPrice100 from search-page should not be present
    And blockProductPrice25 from search-page should not be present

  Scenario: Click on Advanced Search checkbox - Category, Manufacturer, Price range inputs should be displayed
    Given user goes to urlSearch from search-page
    When user clicks checkboxAdvancedSearch from search-page
    Then dropdownCategory from search-page should be present
    And dropdownManufacturer from search-page should be present
    And inputPriceFrom from search-page should be present
    And inputPriceTo from search-page should be present

  Scenario: Click on the product image - user should be redirected to the product page
    Given user goes to urlSearch from search-page
    And user types textNok from search-page in inputCentralSearch from search-page
    And user clicks buttonCentralSearch from search-page
    When user clicks imageNokia1020 from search-page
    Then URL should be urlNokia1020 from search-page

  Scenario: Click on the product name - user should be redirected to the product page
    Given user goes to urlSearch from search-page
    And user types textNok from search-page in inputCentralSearch from search-page
    And user clicks buttonCentralSearch from search-page
    When user clicks blockProductNameNokia1020 from search-page
    Then URL should be urlNokia1020 from search-page
