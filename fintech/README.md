# fintech

A set of happy path end-to-end and API tests to verify the fintech portal.

## Supported versions
<a href="https://nodejs.org/en/" rel="nofollow" target="_blank">Node.js</a> >= 22.3.x,
<a href="https://github.com/microsoft/playwright" rel="nofollow" target="_blank">Playwright</a> >= 1.56.1

## Table of contents

* [Installation](#installation)
* [Running tests](#running-tests)
* [Initial task](#initial-task)
* [Trade-offs and assumptions](#trade-offs-and-assumptions)
* [Test cases](#test-cases)
* [Potential improvement suggestions](#potential-improvement-suggestions)

## Installation

1. Install [Node.js](http://nodejs.org/) 22.3.x (or current LTS version)
2. Clone this repository: `git clone git@github.com:Marketionist/interview-tasks.git`
3. Go to the healthcare folder: `cd interview-tasks/fintech/`
4. Install dependencies and download browsers:
```bash
npm run install:test-dependencies
```
OR if you have an older OS that does not support the latest Google Chrome
(will download Firefox only):
```bash
npm run install:test-dependencies-old
```

## Running tests

Any temporary user credentials can be used - for example `USER_LOGIN` (user
email) can be 'gpcamwyk@sharklasers.com' and `USER_PASS` (user password) can be
'testTest1111'.

- To launch API tests run:
    ```bash
    USER_LOGIN='...' USER_PASS='...' npm run test:api:en
    ```
    OR for French version:
    ```bash
    USER_LOGIN='...' USER_PASS='...' npm run test:api:fr
    ```

- To launch end-to-end tests run:
    ```bash
    USER_LOGIN='...' USER_PASS='...' npm run test:e2e:en
    ```
    OR
    ```bash
    USER_LOGIN='...' USER_PASS='...' npm run test:e2e:fr
    ```

- To launch visual regression tests run:
    ```bash
    npm run test:visual:en
    ```
    OR
    ```bash
    npm run test:visual:fr
    ```

    > Note: you can update baseline images by running:
    > `npm run test:visual:update:en` OR `npm run test:visual:update:fr`

## Initial task

Write a new test suite that would cover Signup functionality:
https://app.qa.nesto.ca/signup.

1. Automate positive and negative test cases that you could think of for
the Signup page.
2. Add coverage for fields, labels.
3. Validate that the API for the account creation returns 201 status code
and validate that the body response contains the entered information
in the form.
4. Handle ability to run your test suite in both languages.
5. Use TypeScript if you have experience (is a bonus).
6. If you discover any bugs, please create a report (attach .txt file or
Google Doc).

Once you complete your test suite please use one of the following
methods to share with us your work:

a. Put your project on GitHub and share with us your repository
(preferable).

b. Make an archive of the entire project (including all the
subfolders and files) then upload to your Google Drive and
share with us a link (delete node_modules folder before
making an archive).

## Trade-offs and assumptions

1. An assumption was made that multiple test users can be created without any
concerns.

2. As there is a limited amount of time and to optimize the efforts, a not
exhaustive list of test cases was created for demonstration purposes.
- Some basic happy path and negative test cases were automated with
[e2e tests](https://github.com/Marketionist/interview-tasks/tree/master/fintech/tests/e2e)
(account deletion and some other possible e2e tests were not automated for the
sake of time economy, but can be covered upon request).
- Some more test cases were automated with
[API tests](https://github.com/Marketionist/interview-tasks/tree/master/fintech/tests/api)
as they are usually considered to be faster and more reliable than e2e tests.
- Also checks for UI of the sign up page (fields and labels) were covered with
[visual regression tests](https://github.com/Marketionist/interview-tasks/tree/master/fintech/tests/visual) (and some of them inside e2e tests).
All of these tests have `-en-` and `-fr-` versions to verify both languages.

3. It looks like "First name" and "Last name" inputs have a limit of 63
characters, so it can be reasonable to test 0 and 64 as a boundary values. Also
all inputs should be tested for possible XSS injections (for example with:
`<script>alert('This code was executed - XSS risk!!!');</script>`).

4. As we do not have a list of environments (browsers/operating systems) that
should be supported, an assumption was be made that the booking flow should
work in Google Chrome as it is the most popular and widely used browser.

5. The amount of tests is not big for now, but they are independent and running
in parallel. For extended future scalability please see `projects` inside
[e2e-config.ts](https://github.com/Marketionist/interview-tasks/blob/master/fintech/e2e-config.ts).

6. Additionally all code is checked for styling quality by lint and husky on
each pre-commit.

## Test cases

<table>
    <thead>
        <tr>
            <th>#</th>
            <th>Test case</th>
            <th>Comments</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>
                Sign up in English with all valid inputs - new user should be
                logged in.
                <br>1. Open https://app.qa.nesto.ca/signup.
                <br>2. Fill in "First name" input (for example: Alpha).
                <br>3. Fill in "Last name" input (for example: Bravo).
                <br>4. Fill in "Phone number" input (for example: +16131234567)
                and select province (for example: Ontario).
                <br>5. Fill in "Email" input (for example:
                iaaxosna@sharklasers.com).
                <br>6. Fill in "Password" input (for example: testTest1111).
                <br>7. Fill in "Confirm password" input (for example:
                testTest1111).
                <br>8. Click "Create your account" button.
                <br>9. Verify that "New mortgage" block is displayed.
            </td>
            <td>
                This test case is a basic happy path scenario for the sign up
                flow.
                <br><br>Automated <a href="https://github.com/Marketionist/interview-tasks/blob/master/fintech/tests/e2e/sign-up-flow-en-e2e-spec.ts#L21" rel="nofollow">here</a>.
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td>
                Sign up in English with extended First name, Last name, phone
                and region inputs - new user should be logged in.
                <br>1. Open https://app.qa.nesto.ca/signup.
                <br>2. Fill in "First name" input (for example:
                Alpha-Bravo Jr. II).
                <br>3. Fill in "Last name" input (for example:
                Charlie-Delta Echo).
                <br>4. Fill in "Phone number" input (for example: 778 123 4567)
                and select province (for example: British-Columbia).
                <br>5. Fill in "Email" input.
                <br>6. Fill in "Password" input.
                <br>7. Fill in "Confirm password" input.
                <br>8. Click "Create your account" button.
                <br>9. Verify that "New mortgage" block is displayed.
            </td>
            <td>
                This test case extends the basic sign up flow.
                <br><br>Automated <a href="https://github.com/Marketionist/interview-tasks/blob/master/fintech/tests/e2e/sign-up-flow-en-e2e-spec.ts#L37" rel="nofollow">here</a>.
            </td>
        </tr>
        <tr>
            <td>3</td>
            <td>
                Sign up in English with 0 characters in First name and Last name
                inputs - error messages should be displayed.
                <br>1. Open https://app.qa.nesto.ca/signup.
                <br>2. Fill in "First name" input (for example: 0).
                <br>3. Fill in "Last name" input (for example: 0).
                <br>4. Fill in "Phone number" input and select province.
                <br>5. Fill in "Email" input.
                <br>6. Fill in "Password" input.
                <br>7. Fill in "Confirm password" input.
                <br>8. Click "Create your account" button.
                <br>9. Verify that error messages are displayed.
            </td>
            <td>
                This test case adds negative test for the basic sign up flow.
                <br><br>Automated <a href="https://github.com/Marketionist/interview-tasks/blob/master/fintech/tests/e2e/sign-up-flow-en-e2e-spec.ts#L53" rel="nofollow">here</a>.
            </td>
        </tr>
        <tr>
            <td>4</td>
            <td>
                Sign up in English with 64 characters in First name and Last name
                inputs - error messages should be displayed.
                <br>1. Open https://app.qa.nesto.ca/signup.
                <br>2. Fill in "First name" input (for example: 64).
                <br>3. Fill in "Last name" input (for example: 64).
                <br>4. Fill in "Phone number" input and select province.
                <br>5. Fill in "Email" input.
                <br>6. Fill in "Password" input.
                <br>7. Fill in "Confirm password" input.
                <br>8. Click "Create your account" button.
                <br>9. Verify that error messages are displayed.
            </td>
            <td>
                This test case adds negative test for the basic sign up flow.
                <br><br>Automated <a href="https://github.com/Marketionist/interview-tasks/blob/master/fintech/tests/e2e/sign-up-flow-en-e2e-spec.ts#L73" rel="nofollow">here</a>.
            </td>
        </tr>
        <tr>
            <td>5</td>
            <td>
                Sign up in English with XSS script in First name and Last name
                inputs - error messages should be displayed.
                <br>1. Open https://app.qa.nesto.ca/signup.
                <br>2. Fill in "First name" input (for example:
                alert('This code was executed - First name XSS risk!!!');).
                <br>3. Fill in "Last name" input (for example:
                alert('This code was executed - Last name XSS risk!!!');).
                <br>4. Fill in "Phone number" input and select province.
                <br>5. Fill in "Email" input.
                <br>6. Fill in "Password" input.
                <br>7. Fill in "Confirm password" input.
                <br>8. Click "Create your account" button.
                <br>9. Verify that error messages are displayed.
            </td>
            <td>
                This test case adds negative test for the basic sign up flow.
                <br><br>Automated <a href="https://github.com/Marketionist/interview-tasks/blob/master/fintech/tests/e2e/sign-up-flow-en-e2e-spec.ts#L93" rel="nofollow">here</a>.
            </td>
        </tr>
        <tr>
            <td>6</td>
            <td>
                Sign up in French with all valid inputs - new user should be
                logged in.
                <br>1. Open https://app.qa.nesto.ca/signup and click FR to
                switch to the French version of the form.
                <br>2. Fill in "First name" input (for example: Adélaïde).
                <br>3. Fill in "Last name" input (for example: Barrière).
                <br>4. Fill in "Phone number" input (for example: +14181234567)
                and select province (for example: Québec).
                <br>5. Fill in "Email" input (for example:
                iaaxosna@sharklasers.com).
                <br>6. Fill in "Password" input (for example: testTest1111).
                <br>7. Fill in "Confirm password" input (for example:
                testTest1111).
                <br>8. Click "Create your account" button.
                <br>9. Verify that "New mortgage" block is displayed.
            </td>
            <td>
                This test case is a basic happy path scenario for the sign up
                flow.
                <br><br>Automated <a href="https://github.com/Marketionist/interview-tasks/blob/master/fintech/tests/e2e/sign-up-flow-fr-e2e-spec.ts#L22" rel="nofollow">here</a>.
            </td>
        </tr>
        <tr>
            <td>7</td>
            <td>
                Sign up in French with with extended First name, Last name,
                phone and region inputs - new user should be logged in.
                <br>1. Open https://app.qa.nesto.ca/signup and click FR to
                switch to the French version of the form.
                <br>2. Fill in "First name" input (for example: Jean-François).
                <br>3. Fill in "Last name" input (for example:
                d'Aboville-Bélanger).
                <br>4. Fill in "Phone number" input (for example: 506 123 4567)
                and select province (for example: Nouveau-Brunswick).
                <br>5. Fill in "Email" input (for example:
                iaaxosna@sharklasers.com).
                <br>6. Fill in "Password" input (for example: testTest1111).
                <br>7. Fill in "Confirm password" input (for example:
                testTest1111).
                <br>8. Click "Create your account" button.
                <br>9. Verify that "New mortgage" block is displayed.
            </td>
            <td>
                This test case extends the basic sign up flow.
                <br><br>Automated <a href="https://github.com/Marketionist/interview-tasks/blob/master/fintech/tests/e2e/sign-up-flow-fr-e2e-spec.ts#L38" rel="nofollow">here</a>.
            </td>
        </tr>
        <tr>
            <td>8</td>
            <td>
                Sign up in French with 0 characters in First name and Last name
                inputs - error messages should be displayed.
                <br>1. Open https://app.qa.nesto.ca/signup.
                <br>2. Fill in "First name" input (for example: 0).
                <br>3. Fill in "Last name" input (for example: 0).
                <br>4. Fill in "Phone number" input and select province.
                <br>5. Fill in "Email" input.
                <br>6. Fill in "Password" input.
                <br>7. Fill in "Confirm password" input.
                <br>8. Click "Create your account" button.
                <br>9. Verify that error messages are displayed.
            </td>
            <td>
                This test case adds negative test for the basic sign up flow.
                <br><br>Automated <a href="https://github.com/Marketionist/interview-tasks/blob/master/fintech/tests/e2e/sign-up-flow-fr-e2e-spec.ts#L54" rel="nofollow">here</a>.
            </td>
        </tr>
        <tr>
            <td>9</td>
            <td>
                Sign up in French with 64 characters in First name and Last name
                inputs - error messages should be displayed.
                <br>1. Open https://app.qa.nesto.ca/signup.
                <br>2. Fill in "First name" input (for example: 64).
                <br>3. Fill in "Last name" input (for example: 64).
                <br>4. Fill in "Phone number" input and select province.
                <br>5. Fill in "Email" input.
                <br>6. Fill in "Password" input.
                <br>7. Fill in "Confirm password" input.
                <br>8. Click "Create your account" button.
                <br>9. Verify that error messages are displayed.
            </td>
            <td>
                This test case adds negative test for the basic sign up flow.
                <br><br>Automated <a href="https://github.com/Marketionist/interview-tasks/blob/master/fintech/tests/e2e/sign-up-flow-fr-e2e-spec.ts#L74" rel="nofollow">here</a>.
            </td>
        </tr>
        <tr>
            <td>10</td>
            <td>
                Sign up in French with XSS script in First name and Last name
                inputs - error messages should be displayed.
                <br>1. Open https://app.qa.nesto.ca/signup.
                <br>2. Fill in "First name" input (for example:
                alert('This code was executed - First name XSS risk!!!');).
                <br>3. Fill in "Last name" input (for example:
                alert('This code was executed - Last name XSS risk!!!');).
                <br>4. Fill in "Phone number" input and select province.
                <br>5. Fill in "Email" input.
                <br>6. Fill in "Password" input.
                <br>7. Fill in "Confirm password" input.
                <br>8. Click "Create your account" button.
                <br>9. Verify that error messages are displayed.
            </td>
            <td>
                This test case adds negative test for the basic sign up flow.
                <br><br>Automated <a href="https://github.com/Marketionist/interview-tasks/blob/master/fintech/tests/e2e/sign-up-flow-fr-e2e-spec.ts#L94" rel="nofollow">here</a>.
                <br><br><strong>BUG</strong>
                <br>Actual result: at the end (step 9), error message has a dot
                at the end "Ce champ est obligatoire.".
                <br>Expected result: to be consistent with all other error
                messages, this one should not have dot at the end: "Ce champ est
                obligatoire".
            </td>
        </tr>
        <tr>
            <td>11</td>
            <td>
                Delete account in English - "Thank you for your feedback!" title should be
                displayed.
                <br>1. Log in to https://app.qa.nesto.ca/getaquote.
                <br>2. Click user avatar -> "User Settings".
                <br>3. Click "Delete Account" button.
                <br>4. Select reason (for example: No Reason).
                <br>5. Check checkbox to confirm deletion.
                <br>6. Click "Delete Account" button.
                <br>7. Verify that "Thank you for your feedback!" title is
                displayed and user is redirected to the main page in English.
            </td>
            <td>
                This test case is a part of the basic sign up flow.
            </td>
        </tr>
        <tr>
            <td>12</td>
            <td>
                Delete account in French - "Merci pour votre retour!" title
                should be displayed.
                <br>1. Log in to https://app.qa.nesto.ca/getaquote.
                <br>2. Click user avatar -> "Paramètres de l'utilisateur".
                <br>3. Click "Supprimer le compte" button.
                <br>4. Select reason (for example: Sans raison).
                <br>5. Check checkbox to confirm deletion.
                <br>6. Click "Supprimer le compte" button.
                <br>7. Verify that "Merci pour votre retour!" title is
                displayed and user is redirected to the main page in French.
            </td>
            <td>
                This test case is a part of the basic sign up flow.
                <br><br><strong>BUG</strong>
                <br>Actual result: at the end (step 7), when account
                deletion is already confirmed, user is presented with page in
                English ("Thank you for your feedback!" title is displayed) and
                then redirected to the English version of the main page
                (https://www.nesto.ca/).
                <br>Expected result: page in French with "Merci pour votre
                retour!" title should be displayed and then user should be
                redirected to the French version of the main page
                (https://www.nesto.ca/fr/).
            </td>
        </tr>
    </tbody>
</table>

## Potential improvement suggestions

1. While typing in user credentials in "Password" and "Confirm password"
inputs at https://app.qa.nesto.ca/signup the actual characters are not shown -
it can be helpful to display a Show icon for both of the inputs to let users
see what they have currently typed in.
2. User can paste any value into the "Confirm password" input - it can be
helpful to disable pasting (to make sure users manually type in password
confirmation) with something like:
```html
<input type="password" onpaste="return false;">
```
3. After creating a new user, deleting it and creating an new user with the same
credentials again, the infinite spinner is displayed inside "Create your
account" button (https://auth.nesto.ca/co/authenticate returns `403` with
`{ error: "access_denied", error_description: "Wrong email or password." }`, but
the majority of users will not see it). Changing the input values does not
unblock "Create your account" button, so the only way to try again is to
reload the page (and in such case all inputs lose their values). It can be
helpful to display an error notification for user to understand what's going on
and to unblock "Create your account" button while preserving all values inside
the inputs.



