Feature: Discounts_API
    In order to test discounts
    As a test engineer
    I want to make API calls and verify returned values

    # Scenario: Orders with 10 items receive a 0% discount
    #     Given I have 10 items in my order 10
    #     When I view the checkout summary for order 10
    #     Then there is a 0% discount applied for order 10

    # Scenario: Orders with 11 items receive a 5% discount
    #     Given I have 11 items in my order 11
    #     When I view the checkout summary for order 11
    #     Then there is a 5% discount applied for order 11

    # Scenario: Orders with 20 items receive a 5% discount
    #     Given I have 20 items in my order 20
    #     When I view the checkout summary for order 20
    #     Then there is a 5% discount applied for order 20

    # Scenario: Orders with 21 items receive a 10% discount
    #     Given I have 21 items in my order 21
    #     When I view the checkout summary for order 21
    #     Then there is a 10% discount applied for order 21

    # Scenario: Orders with 30 items receive a 10% discount
    #     Given I have 30 items in my order 30
    #     When I view the checkout summary for order 30
    #     Then there is a 10% discount applied for order 30

    # Scenario: Orders with 31 items receive a 20% discount
    #     Given I have 31 items in my order 31
    #     When I view the checkout summary for order 31
    #     Then there is a 20% discount applied for order 31

    Scenario Outline: Orders with <items> items receive a <discount>% discount
        Given I have <items> items in my order <order>
        When I view the checkout summary for order <order>
        Then there is a <discount>% discount applied for order <order>

        Examples:
            | items | order | discount |
            | 10    | 10    | 0        |
            | 11    | 11    | 5        |
            | 20    | 20    | 5        |
            | 21    | 21    | 10       |
            | 30    | 30    | 10       |
            | 31    | 31    | 20       |
