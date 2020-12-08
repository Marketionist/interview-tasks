# search-feature

A set of happy path e2e tests to verify the search feature

## Supported versions
Should work on any [Node.js](http://nodejs.org/) version >=8.6.x. Tested on
Node.js 14.15.1.

## Table of contents

* [Installation](#installation)
* [Initial task](#initial-task)
* [Deliverables](#deliverables)
  * [Test strategy](#test-strategy)
  * [Test plan and test execution report](#test-plan-and-test-execution-report)
  * [Notes to clarify wireframe](#notes-to-clarify-wireframe)
  * [Bug drafts](#bug-drafts)
  * [Feedback on how to improve the quality in the team](#feedback-on-how-to-improve-the-quality-in-the-team)
* [Thanks](#thanks)

## Installation
1. Install [Node.js](http://nodejs.org/) 14.x.x (LTS)
2. Clone this repository: `git clone git@github.com:Marketionist/interview-tasks.git`
3. Go to search-feature folder: `cd interview-tasks/e2e-testing/search-feature/`
4. Install all dependencies: `npm install`
5. Run tests: `npm run test`

## Initial task
You were just hired by a fictional company to join their ecommerce team. You are
the first Quality Engineer in the team. The development of the feature is
already in production and that's the environment you are going to use for your
testing. The manager, who is not familiar with Agile Testing, asked you to help
them with one task: to make sure that search functionality works as expected.

Could you please make sure that the search functionality is working as expected?
Here's a wireframe I've done myself that the developers used to build it and I
believe you can use it to guide your work. Could you please do your magic and
help us?

It should be clear to you by now that, unfortunately, this team knows nothing
about Agile methodologies. Moreover, the only registered conversation about the
search feature is a low-level wireframe sketch that the manager has sent to the
developers. This wireframe contains some annotations in blue for business rules
and annotations in yellow for the expected values on the fields. The manager
expected that the fields on the page to have the same name, content, position on
the screen and layout as in the wireframe.

You can access the production environment of the ecommerce platform on
https://frontend.nopcommerce.com/​. From the home page, you can find the search
functionality on the top right part of the page. From there, you will be
redirected to the search page that is shown in the wireframe.

![Wireframe](https://raw.githubusercontent.com/Marketionist/interview-tasks/master/e2e-testing/search-feature/media/wireframe.jpg)

## Deliverables

### Test strategy
Time frame: end of day Monday.

Suggested activities - testing will be split into 4 phases:
1. Manual testing + writing test cases.
2. Setting priorities for automation.
3. Test automation according to priorities.
4. Follow-up feedback discussion.

As we have a limited amount of time and to optimize the efforts, only happy path
test cases with priority 1 will be automated for now.

> Note: as can be seen from the Network tab of Developer Tools, all searches on
> https://frontend.nopcommerce.com send queries to
> https://demo.nopcommerce.com/search. From the UI/UX and test automation
> considerations - I would recommend to fix the routing: when user searches for
> something, they should be redirected to the dedicated search page:
> https://frontend.nopcommerce.com/search. As for now
> https://frontend.nopcommerce.com/search returns 404 error, for test automation
> purposes I will be using https://demo.nopcommerce.com/search directly as a
> starting point (if required, it can be easily be switched to
> https://frontend.nopcommerce.com by setting the environment variable:
> `URL_MAIN_PAGE='https://frontend.nopcommerce.com' npm run test`).

Test automation will be done with `TestCafe` + `Cucumber` as it gives a good
structure, is easy to maintain on a long run and is clear for both developers
and stackholders.

One of my existing packages will be used for Cucumber step definitions:
https://github.com/Marketionist/testcafe-cucumber-steps (it is free, open
source and officially approved by TestCafe team - see Cucumber Support section
in https://github.com/DevExpress/testcafe#plugins).

As we do not have a list of environments (browsers/operating systems) that
should be supported, an assumption will be made that the search feature should
work in Google Chrome as it is the most popular and widely used browser.

As the amount of tests is not big for now the concurrency for test execution
will be set to 1. It can easily be extended later on. In addition to that, tests
can be run in Continuous Integration system by launching `npm run test-ci` (will
trigger a run in the headless mode).

### Test plan and test execution report
Test cases (for both automation and manual/exploratory testing) to get a good
level of confidence that the main aspects of the search feature are covered:

<table>
    <thead>
        <tr>
            <th>#</th>
            <th>Test case</th>
            <th>Automation priority</th>
            <th>Automated in</th>
            <th>Test execution status</th>
            <th>Comments</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Search for "a" in the top right Search item input - search result should be displayed.</td>
            <td></td>
            <td></td>
            <td>Failed</td>
            <td>"Search term minimum length is 3 characters" notification is displayed.</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Search for "nok" in the top right Search item input - search result should be displayed.</td>
            <td></td>
            <td></td>
            <td>Passed</td>
            <td></td>
        </tr>
        <tr>
            <td>3</td>
            <td>Search for "" in the top right Search item input - "Search term minimum length is 1 character" notification should be displayed.</td>
            <td></td>
            <td></td>
            <td>Failed</td>
            <td>Empty input browser alert is displayed.</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Search for "nosuchproductnow&ever123" in the top right Search item input - blue notification "No results for {search_criteria}." should be displayed.</td>
            <td></td>
            <td></td>
            <td>Failed</td>
            <td>Red notification "No products were found that matched your criteria.
" is displayed.</td>
        </tr>
        <tr>
            <td>5</td>
            <td>Search for "a" in the central Search item input - search result should be displayed.</td>
            <td>1</td>
            <td>https://github.com/Marketionist/interview-tasks/blob/master/e2e-testing/search-feature/tests/search.feature#L7</td>
            <td>Failed</td>
            <td>"Search term minimum length is 3 characters" notification is displayed.</td>
        </tr>
        <tr>
            <td>6</td>
            <td>Search for "nok" in the central Search item input - search result should be displayed.</td>
            <td>1</td>
            <td>https://github.com/Marketionist/interview-tasks/blob/master/e2e-testing/search-feature/tests/search.feature#L7</td>
            <td>Passed</td>
        </tr>
        <tr>
            <td>7</td>
            <td>Search for "" in the central Search item input - "Search term minimum length is 1 character" notification should be displayed.</td>
            <td></td>
            <td></td>
            <td>Failed</td>
            <td>"Search term minimum length is 3 characters" notification is displayed.</td>
        </tr>
        <tr>
            <td>8</td>
            <td>Search for "nosuchproductnow&ever123" in the central Search item input - blue notification "No results for {search_criteria}." should be displayed.</td>
            <td>1</td>
            <td>https://github.com/Marketionist/interview-tasks/blob/master/e2e-testing/search-feature/tests/search.feature#L18</td>
            <td>Failed</td>
            <td>Red notification "No products were found that matched your criteria.
" is displayed.</td>
        </tr>
        <tr>
            <td>10</td>
            <td>Search for "gift card" in the central Search item input - 3 products with prices 25, 50, 75 should be displayed.</td>
            <td>1</td>
            <td>https://github.com/Marketionist/interview-tasks/blob/master/e2e-testing/search-feature/tests/search.feature#L24</td>
            <td>Passed</td>
            <td></td>
        </tr>
        <tr>
            <td>11</td>
            <td>Search for "gift card" in the central Search item input, set Category to Books - No results notification should be displayed.</td>
            <td></td>
            <td></td>
            <td>Passed</td>
            <td></td>
        </tr>
        <tr>
            <td>12</td>
            <td>Search for "gift card" in the central Search item input, set Category to Gift Cards, set Price range from 50 to 75 - 1 product with price 50 should be displayed.</td>
            <td>1</td>
            <td>https://github.com/Marketionist/interview-tasks/blob/master/e2e-testing/search-feature/tests/search.feature#L32</td>
            <td>Passed</td>
            <td></td>
        </tr>
        <tr>
            <td>13</td>
            <td>Search for "gift card" in the central Search item input - maximum of 3 products per row, product image on the left side, product name, ratings, price and buttons on the right side should be displayed.</td>
            <td></td>
            <td></td>
            <td>Failed</td>
            <td>Product name, ratings, price and buttons are displayed under the product.</td>
        </tr>
        <tr>
            <td>14</td>
            <td>Search for "gift card" in the central Search item input and click on the list icon - list layout should not be applied.</td>
            <td></td>
            <td></td>
            <td>Failed</td>
            <td>List layout is applied.</td>
        </tr>
        <tr>
            <td>15</td>
            <td>Click on Advanced Search checkbox - Category, Manufacturer, Price range inputs should be displayed.</td>
            <td>1</td>
            <td>https://github.com/Marketionist/interview-tasks/blob/master/e2e-testing/search-feature/tests/search.feature#L44</td>
            <td>Passed</td>
            <td>Price range inputs are missing "From:" and "To:" labels.</td>
        </tr>
        <tr>
            <td>16</td>
            <td>Click on Category dropdown - list of values from the wireframe should be displayed, values should be sorted from A to Z.</td>
            <td></td>
            <td></td>
            <td>Failed</td>
            <td>Dropdown values are not sorted from A to Z.</td>
        </tr>
        <tr>
            <td>17</td>
            <td>Click on Manufacturer dropdown - list of values from the wireframe should be displayed.</td>
            <td></td>
            <td></td>
            <td>Failed</td>
            <td>Dropdown values do not match the values provided in the wireframe.</td>
        </tr>
        <tr>
            <td>18</td>
            <td>Click on Sort by dropdown - list of values from the wireframe should be displayed.</td>
            <td></td>
            <td></td>
            <td>Passed</td>
            <td></td>
        </tr>
        <tr>
            <td>19</td>
            <td>Click on Show results per page dropdown - list of values from the wireframe should be displayed.</td>
            <td></td>
            <td></td>
            <td>Failed</td>
            <td>Dropdown values do not match the values provided in the wireframe.</td>
        </tr>
        <tr>
            <td>20</td>
            <td>Click on the product image - user should be redirected to the product page.</td>
            <td>1</td>
            <td>https://github.com/Marketionist/interview-tasks/blob/master/e2e-testing/search-feature/tests/search.feature#L52</td>
            <td>Passed</td>
            <td></td>
        </tr>
        <tr>
            <td>21</td>
            <td>Click on the product name - user should be redirected to the product page.</td>
            <td>1</td>
            <td>https://github.com/Marketionist/interview-tasks/blob/master/e2e-testing/search-feature/tests/search.feature#L59</td>
            <td>Passed</td>
            <td></td>
        </tr>
        <tr>
            <td>22</td>
            <td>Verify the working of Automatically search sub categories checkbox. *</td>
            <td>2</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>23</td>
            <td>Verify the working of Manufacturer dropdown. *</td>
            <td>2</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>24</td>
            <td>Verify the working of Search In product descriptions checkbox. *</td>
            <td>2</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>

\* - TODO: search for (or ideally create) test data to verify the marked test
cases.

### Notes to clarify wireframe
1. Should top right Search item input and central Search item input work
consistently? Searching with empty input behaves differently now. Default
assumption - yes, both inputs should work similarly.
2. "If the user clicks on the product image or on the product name, then they
should be redirected to the ..." - the text in the wireframe is truncated -
where the user should be redirected to? Default assumption - product page.
3. Should all dropdown values be sorted from A to Z (for the sake of
consistency)?
4. "Please don't implement the list layout and leave the list icon (the one on
the right) without any function when the user clicks on it." - I would recommend
to hide this icon for not to mislead the user (the other option can be
displaying it as deactivated).

### Bug drafts
1. Both top right and central Search features have a search term minimum length
of 3 characters (they should have a search term minimum length of 1
character). *
2. When searching for "" in the top right Search item input - empty input
browser alert is displayed ("Search term minimum length is 1 character"
notification should be displayed). *
3. When searching for "nosuchproductnow&ever123" - red notification "No
products were found that matched your criteria." is displayed (blue notification
"No results for {search_criteria}." should be displayed). *
4. Search for "gift card" in the central Search item input - product name,
ratings, price and buttons are displayed under the product image (they should be
displayed on the right side of the product image). *
5. Search for "gift card" in the central Search item input and click on the list
icon - list layout is applied (it should be left without any function). *
6. Click on Category dropdown - list of values is not sorted from A to Z. *
7. Click on Manufacturer dropdown - list of values does not match the values
provided in the wireframe.
8. Click on Show results per page dropdown - list of values does not match the
values provided in the wireframe. *
9. Top right Search item input placeholder is "Search store" (it should be
"Search item"). *
10. h1 title is "Search" (it should be "Search the store"). *
11. Central Search item input has label "Search keyword" (it should have label
"Search item" and "Enter your search item here" placeholder). *
12. Advanced Search checkbox is positioned under the central Search item input
(it should be displayed on the right side of the central Search item input). *
13. Automatically search sub-categories checkbox is positioned under the
Category input (it should be displayed on the right side of the Category
input). *
14. Price range inputs are missing "From:" and "To:" labels. *
15. Search in product descriptions checkbox is positioned under the Price range
inputs (it should be displayed on the right side of the Price range inputs). *
16. "Display per page" label should be renamed to "Show results per page". *
17. "Sort by" and "Show" labels are missing ":" at the end. *

\* - TODO: add Priority, Steps to reproduce, Actual result, Expected result,
Screenshots, Environment, etc.

### Feedback on how to improve the quality in the team
1. It can be beneficial to include SDETs/test automation engineers in
development process as early as possible - to start mitigating risks on early
stages of feature planning/design.
2. It would be great to clarify the requirements with acceptance criteria
and a list of environments (browsers/operating systems) that should be
supported.
3. As for the list layout icon functionality that should be displayed but not
implemented - feature flags can potentially be a nice technique to introduce for
such cases.

## Thanks
If this script was helpful for you, please give it a **★ Star**
on [GitHub](https://github.com/Marketionist/interview-tasks).
