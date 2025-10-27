# healthcare

A set of happy path end-to-end and API tests to verify the healthcare portal.

## Supported versions
<a href="https://nodejs.org/en/" rel="nofollow" target="_blank">Node.js</a> >= 22.3.x,
<a href="https://github.com/microsoft/playwright" rel="nofollow" target="_blank">Playwright</a> >= 1.56.1

## Table of contents

* [Installation](#installation)
* [Running tests](#running-tests)
* [Initial task](#initial-task)
* [Deliverables](#deliverables)
  * [Trade-offs and assumptions](#trade-offs-and-assumptions)
  * [Test cases](#test-cases)
  * [Potential improvement suggestions](#potential-improvement-suggestions)
* [Thanks](#thanks)

## Installation

1. Install [Node.js](http://nodejs.org/) 22.3.x (LTS)
2. Clone this repository: `git clone git@github.com:Marketionist/interview-tasks.git`
3. Go to the healthcare folder: `cd interview-tasks/healthcare/`
4. Install dependencies and download browsers:
```bash
npm run install:test-dependencies
```
OR if you have an older OS:
```bash
npm run install:test-dependencies-old
```

## Running tests

- To launch API tests run:
    ```bash
    npm run test:api
    ```

- To launch end-to-end tests run:
    ```bash
    LOGIN='...' PASSWORD='...' npm run test:e2e
    ```

    > Note: member users can be created on a Member Facing Portal without any
    > concerns.

## Initial task

### Question 1

#### Part 1

The booking flow is integral to Company's business operation. Please go through
the first three steps of the booking process including payment and devise 15
test cases throughout the entire process you think are the most important. When
submitting the assignment, please return the test cases from the most important
to the least important.

#### Part 2

For the top 3 test cases from Part 1, please provide a description explaining
why they are indicated as your most important.

### Question 2

#### Part 1

Being privacy focused is integral to our culture and business model. Please
devise an integration test case that prevents members from accessing other’s
medical data.
Hint: Begin Medical Questionnaire.

#### Part 2

Please devise HTTP requests from Part 1 to implement your test case. Submitting
written HTTP requisitions is fine, you do not need to submit a postman project.

#### Part 3

At Company, we have over 100 endpoints that transfer sensitive data. What is
your thought process around managing the security quality of these endpoints?
What are the tradeoffs and potential risks of your solution?

#### Automation

Use Playwright to automate 2–3 of the test cases you ranked highest for the
booking flow.
Please include:
- Trade-offs and assumptions.
- Include a short README.md with setup steps and your explanation notes.
- Comments or a README.md explaining assumptions, scalability, and what you
would implement in the future.
- Submit a GitHub repo link containing all tests and documentation.
- Structure your automation scripts using a scalable model (preferably Page
Object Model). Your submission must demonstrate architecture, coding, and design
decisions required for production-level.

## Deliverables

### Trade-offs and assumptions

1. As we have a limited amount of time and to optimize the efforts, only 3 first
happy path test cases with priority 1 will be automated for now.

2. An assumption was made that 2 most used products are MRI Scan and Heart &
Lungs CT Scan, thus they were covered as a priority 1.

3. As we do not have a list of environments (browsers/operating systems) that
should be supported, an assumption will be made that the booking flow should
work in Google Chrome as it is the most popular and widely used browser.

4. Additional verifications for price changes should be added for
https://myezra-staging.ezra.com/book-scan/reserve-appointment:
- After "Continue Without Heart Calcium" is selected.
- After entering a promo code.
But they are less important than patient's health, so a trade-off was made.

5. As the amount of tests is not big for now the concurrency for test execution
will be set to 1. It can easily be extended later on. In addition to that, tests
can be run in Continuous Integration system by launching `npm run test-ci` (will
trigger a run in the headless mode).

### Test cases

Test cases (for both automation and manual/exploratory testing) to get a good
level of confidence that the main aspects of the booking flow are covered:

Select your plan -> Schedule your scan -> Reserve your appointment

> Note: payment card details (https://docs.stripe.com/testing):

> Card number: 4242 4242 4242 4242

> Expiration (MM/YY): 12/34

> Security code: 567

> Country: United States

> ZIP code: 12345

<table>
    <thead>
        <tr>
            <th>#</th>
            <th>Test case</th>
            <th>Automated in</th>
            <th>Comments</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>
                Schedule <strong>MRI Scan</strong> - appointment should be
                displayed in the User Facing Portal.
                <br>1. Log in to https://myezra-staging.ezra.com/.
                <br>2. Click "Book a scan" button.
                <br>3. Fill in Date of birth (for example: 10-10-1990) and select
                sex at birth (for example: Male) - this step is needed only for
                a new user setup.
                <br>4. Select "MRI Scan".
                <br>5. Click "Continue" button.
                <br>6. Select a state (for example: New York).
                <br>7. Select a location (for example: QA Automation Center: 12345,
                New York, NY 12345).
                <br>8. Fill in Additional Scheduling Information (for example: Test).
                <br>9. Select a date (or 3 different dates) and 3 time slots (for
                example: Nov 7, 2025 • 12:01 AM; Nov 7, 2025 • 12:01 PM; Nov 7,
                2025 • 11:31 PM).
                <br>10. Click "Continue" button.
                <br>11. Fill in payment card details.
                <br>12. Click "Continue" button.
                <br>13. Verify that "Begin Medical Questionnaire" button is
                displayed.
                <br>14. Log in and go to https://staging-hub.ezra.com/appointments.
                <br>15. Search the Appointments table by the member email (for
                example: msbqxqan@sharklasers.com) and verify that the test
                appointment is displayed and its status is Pending.
            </td>
            <td></td>
            <td>
                This test case is a basic happy path scenario for the booking
                flow.
                <br><strong>BUG</strong>: selecting "Alaska" leads to a wrong
                location being displayed: "SimonMed Imaging Centers: 30 Street,
                1, Toronto, AK 11111-1111".
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td>
                Schedule <strong>Heart & Lungs CT Scan</strong> with
                <strong>all</strong> "Yes" in the questionnaire - appointment
                should be displayed in the User Facing Portal.
                <br>1. Log in to https://myezra-staging.ezra.com/.
                <br>2. Click "Book a scan" button.
                <br>3. Select "MRI Scan" and "Heart & Lungs CT Scan".
                <br>4. Click "Continue" button.
                <br>5. Select "Yes" for all questions in the popup questionnaire.
                <br>6. Click "Submit" button.
                <br>7. Click "Continue Without Heart Calcium" button.
                <br>8. Select a state.
                <br>9. Select a location.
                <br>10. Fill in Additional Scheduling Information.
                <br>11. Select a date (or 3 different dates) and 3 time slots.
                <br>12. Click "Continue" button.
                <br>13. Fill in payment card details.
                <br>14. Click "Continue" button.
                <br>15. Verify that "Begin Medical Questionnaire" button is
                <br>displayed.
                <br>16. Log in and go to https://staging-hub.ezra.com/appointments.
                <br>17. Search the Appointments table by the member email and verify
                that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case is selected as a high prio because it introduces
                additional functionality that can impact patient's health and
                updates final price.
            </td>
        </tr>
        <tr>
            <td>3</td>
            <td>
                Schedule <strong>MRI Scan with Heart & Lungs CT Scan</strong>
                add-on with <strong>all</strong> "Yes" in the questionnaire -
                appointment should be displayed in the User Facing Portal.
                <br>1. Log in to https://myezra-staging.ezra.com/.
                <br>2. Click "Book a scan" button.
                <br>3. Select "MRI Scan" and "Heart & Lungs CT Scan".
                <br>4. Click "Continue" button.
                <br>5. Select "Yes" for all questions in the popup questionnaire.
                <br>6. Click "Submit" button.
                <br>7. Click "Continue Without Heart Calcium" button.
                <br>8. Select a state.
                <br>9. Select a location.
                <br>10. Fill in Additional Scheduling Information.
                <br>11. Select a date (or 3 different dates) and 3 time slots.
                <br>12. Click "Continue" button.
                <br>13. Fill in payment card details.
                <br>14. Click "Continue" button.
                <br>15. Verify that "Begin Medical Questionnaire" button is
                <br>displayed.
                <br>16. Log in and go to https://staging-hub.ezra.com/appointments.
                <br>17. Search the Appointments table by the member email and verify
                that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case extends the basic booking flow with adding an
                add-on. It is selected as a high prio because it introduces
                additional functionality that can impact patient's health and
                updates final price.
                <br>It seems like booking has a delay of ~2min before the status
                gets updated in https://staging-hub.ezra.com/appointments.
            </td>
        </tr>
        <tr>
            <td>4</td>
            <td>
                Schedule <strong>Heart & Lungs CT Scan</strong> with "Yes" for
                <strong>chest pain</strong> in the questionnaire - appointment
                should be displayed in the User Facing Portal.
                <br>1. Log in to https://myezra-staging.ezra.com/.
                <br>2. Click "Book a scan" button.
                <br>3. Select "Heart & Lungs CT Scan".
                <br>4. Click "Continue" button.
                <br>5. Select "Yes" for chest pain in the popup questionnaire.
                <br>6. Click "Submit" button.
                <br>7. Click "Continue Without Heart Calcium" button.
                <br>8. Select a state.
                <br>9. Select a location.
                <br>10. Fill in Additional Scheduling Information.
                <br>11. Select a date (or 3 different dates) and 3 time slots.
                <br>12. Click "Continue" button.
                <br>13. Fill in payment card details.
                <br>14. Click "Continue" button.
                <br>15. Verify that "Begin Medical Questionnaire" button is
                displayed.
                <br>16. Log in and go to https://staging-hub.ezra.com/appointments.
                <br>17. Search the Appointments table by the member email and verify
                that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case is selected as a high prio because it introduces
                additional functionality that can impact patient's health and
                updates final price.
            </td>
        </tr>
        <tr>
            <td>5</td>
            <td>
                Schedule <strong>Heart & Lungs CT Scan</strong> with "Yes" for
                <strong>cardiac stent</strong> in the questionnaire -
                appointment should be displayed in the User Facing Portal.
                <br>1. Log in to https://myezra-staging.ezra.com/.
                <br>2. Click "Book a scan" button.
                <br>3. Select "Heart & Lungs CT Scan".
                <br>4. Click "Continue" button.
                <br>5. Select "Yes" for cardiac stent in the popup questionnaire.
                <br>6. Click "Submit" button.
                <br>7. Click "Continue Without Heart Calcium" button.
                <br>8. Select a state.
                <br>9. Select a location.
                <br>10. Fill in Additional Scheduling Information.
                <br>11. Select a date (or 3 different dates) and 3 time slots.
                <br>12. Click "Continue" button.
                <br>13. Fill in payment card details.
                <br>14. Click "Continue" button.
                <br>15. Verify that "Begin Medical Questionnaire" button is
                displayed.
                <br>16. Log in and go to https://staging-hub.ezra.com/appointments.
                <br>17. Search the Appointments table by the member email and verify
                that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case is selected as a high prio because it introduces
                additional functionality that can impact patient's health and
                updates final price.
            </td>
        </tr>
        <tr>
            <td>6</td>
            <td>
                Schedule <strong>Heart & Lungs CT Scan</strong> with "Yes" for
                <strong>pacemaker</strong> in the questionnaire -
                appointment should be displayed in the User Facing Portal.
                <br>1. Log in to https://myezra-staging.ezra.com/.
                <br>2. Click "Book a scan" button.
                <br>3. Select "Heart & Lungs CT Scan".
                <br>4. Click "Continue" button.
                <br>5. Select "Yes" for pacemaker in the popup questionnaire.
                <br>6. Click "Submit" button.
                <br>7. Click "Continue Without Heart Calcium" button.
                <br>8. Select a state.
                <br>9. Select a location.
                <br>10. Fill in Additional Scheduling Information.
                <br>11. Select a date (or 3 different dates) and 3 time slots.
                <br>12. Click "Continue" button.
                <br>13. Fill in payment card details.
                <br>14. Click "Continue" button.
                <br>15. Verify that "Begin Medical Questionnaire" button is
                displayed.
                <br>16. Log in and go to https://staging-hub.ezra.com/appointments.
                <br>17. Search the Appointments table by the member email and verify
                that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case is selected as a high prio because it introduces
                additional functionality that can impact patient's health and
                updates final price.
            </td>
        </tr>
        <tr>
            <td>7</td>
            <td>
                Schedule <strong>Heart & Lungs CT Scan</strong> with "Yes" for
                <strong>coronary artery disease</strong> in the questionnaire -
                appointment should be displayed in the User Facing Portal.
                <br>1. Log in to https://myezra-staging.ezra.com/.
                <br>2. Click "Book a scan" button.
                <br>3. Select "Heart & Lungs CT Scan".
                <br>4. Click "Continue" button.
                <br>5. Select "Yes" for coronary artery disease in the popup
                questionnaire.
                <br>6. Click "Submit" button.
                <br>7. Click "Continue Without Heart Calcium" button.
                <br>8. Select a state.
                <br>9. Select a location.
                <br>10. Fill in Additional Scheduling Information.
                <br>11. Select a date (or 3 different dates) and 3 time slots.
                <br>12. Click "Continue" button.
                <br>13. Fill in payment card details.
                <br>14. Click "Continue" button.
                <br>15. Verify that "Begin Medical Questionnaire" button is
                displayed.
                <br>16. Log in and go to https://staging-hub.ezra.com/appointments.
                <br>17. Search the Appointments table by the member email and verify
                that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case is selected as a high prio because it introduces
                additional functionality that can impact patient's health and
                updates final price.
            </td>
        </tr>
        <tr>
            <td>8</td>
            <td>
                Schedule <strong>Heart & Lungs CT Scan</strong> with "Yes" for
                <strong>calcium score greater than 10</strong> in the
                questionnaire - appointment should be displayed in the User
                Facing Portal.
                <br>1. Log in to https://myezra-staging.ezra.com/.
                <br>2. Click "Book a scan" button.
                <br>3. Select "Heart & Lungs CT Scan".
                <br>4. Click "Continue" button.
                <br>5. Select "Yes" for calcium score greater than 10 in the popup
                questionnaire.
                <br>6. Click "Submit" button.
                <br>7. Click "Continue Without Heart Calcium" button.
                <br>8. Select a state.
                <br>9. Select a location.
                <br>10. Fill in Additional Scheduling Information.
                <br>11. Select a date (or 3 different dates) and 3 time slots.
                <br>12. Click "Continue" button.
                <br>13. Fill in payment card details.
                <br>14. Click "Continue" button.
                <br>15. Verify that "Begin Medical Questionnaire" button is
                displayed.
                <br>16. Log in and go to https://staging-hub.ezra.com/appointments.
                <br>17. Search the Appointments table by the member email and verify
                that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case is selected as a high prio because it introduces
                additional functionality that can impact patient's health and
                updates final price.
            </td>
        </tr>
        <tr>
            <td>9</td>
            <td>
                Schedule <strong>MRI Scan with Heart & Lungs CT Scan</strong>
                add-on with "Yes" for <strong>chest pain</strong> in the
                questionnaire - appointment should be displayed in the User
                Facing Portal.
                <br>1. Log in to https://myezra-staging.ezra.com/.
                <br>2. Click "Book a scan" button.
                <br>3. Select "MRI Scan" and "Heart & Lungs CT Scan".
                <br>4. Click "Continue" button.
                <br>5. Select "Yes" for chest pain in the popup questionnaire.
                <br>6. Click "Submit" button.
                <br>7. Click "Continue Without Heart Calcium" button.
                <br>8. Select a state.
                <br>9. Select a location.
                <br>10. Fill in Additional Scheduling Information.
                <br>11. Select a date (or 3 different dates) and 3 time slots.
                <br>12. Click "Continue" button.
                <br>13. Fill in payment card details.
                <br>14. Click "Continue" button.
                <br>15. Verify that "Begin Medical Questionnaire" button is
                displayed.
                <br>16. Log in and go to https://staging-hub.ezra.com/appointments.
                <br>17. Search the Appointments table by the member email and verify
                that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case has a high prio because it introduces
                additional functionality that can impact patient's health and
                updates final price.
            </td>
        </tr>
        <tr>
            <td>10</td>
            <td>
                Schedule <strong>MRI Scan with Heart & Lungs CT Scan</strong>
                add-on with "Yes" for <strong>cardiac stent</strong> in the
                questionnaire - appointment should be displayed in the User
                Facing Portal.
                <br>1. Log in to https://myezra-staging.ezra.com/.
                <br>2. Click "Book a scan" button.
                <br>3. Select "MRI Scan" and "Heart & Lungs CT Scan".
                <br>4. Click "Continue" button.
                <br>5. Select "Yes" for cardiac stent in the popup questionnaire.
                <br>6. Click "Submit" button.
                <br>7. Click "Continue Without Heart Calcium" button.
                <br>8. Select a state.
                <br>9. Select a location.
                <br>10. Fill in Additional Scheduling Information.
                <br>11. Select a date (or 3 different dates) and 3 time slots.
                <br>12. Click "Continue" button.
                <br>13. Fill in payment card details.
                <br>14. Click "Continue" button.
                <br>15. Verify that "Begin Medical Questionnaire" button is
                displayed.
                <br>16. Log in and go to https://staging-hub.ezra.com/appointments.
                <br>17. Search the Appointments table by the member email and verify
                that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case has a high prio because it introduces
                additional functionality that can impact patient's health and
                updates final price.
            </td>
        </tr>
        <tr>
            <td>11</td>
            <td>
                Schedule <strong>MRI Scan with Heart & Lungs CT Scan</strong>
                add-on with "Yes" for <strong>pacemaker</strong> in the
                questionnaire - appointment should be displayed in the User
                Facing Portal.
                <br>1. Log in to https://myezra-staging.ezra.com/.
                <br>2. Click "Book a scan" button.
                <br>3. Select "MRI Scan" and "Heart & Lungs CT Scan".
                <br>4. Click "Continue" button.
                <br>5. Select "Yes" for pacemaker in the popup questionnaire.
                <br>6. Click "Submit" button.
                <br>7. Click "Continue Without Heart Calcium" button.
                <br>8. Select a state.
                <br>9. Select a location.
                <br>10. Fill in Additional Scheduling Information.
                <br>11. Select a date (or 3 different dates) and 3 time slots.
                <br>12. Click "Continue" button.
                <br>13. Fill in payment card details.
                <br>14. Click "Continue" button.
                <br>15. Verify that "Begin Medical Questionnaire" button is
                displayed.
                <br>16. Log in and go to https://staging-hub.ezra.com/appointments.
                <br>17. Search the Appointments table by the member email and verify
                that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case has a high prio because it introduces
                additional functionality that can impact patient's health and
                updates final price.
            </td>
        </tr>
        <tr>
            <td>12</td>
            <td>
                Schedule <strong>MRI Scan with Heart & Lungs CT Scan</strong>
                add-on with "Yes" for <strong>coronary artery disease</strong>
                in the questionnaire - appointment should be displayed in the
                User Facing Portal.
                <br>1. Log in to https://myezra-staging.ezra.com/.
                <br>2. Click "Book a scan" button.
                <br>3. Select "MRI Scan" and "Heart & Lungs CT Scan".
                <br>4. Click "Continue" button.
                <br>5. Select "Yes" for coronary artery disease in the popup
                questionnaire.
                <br>6. Click "Submit" button.
                <br>7. Click "Continue Without Heart Calcium" button.
                <br>8. Select a state.
                <br>9. Select a location.
                <br>10. Fill in Additional Scheduling Information.
                <br>11. Select a date (or 3 different dates) and 3 time slots.
                <br>12. Click "Continue" button.
                <br>13. Fill in payment card details.
                <br>14. Click "Continue" button.
                <br>15. Verify that "Begin Medical Questionnaire" button is
                displayed.
                <br>16. Log in and go to https://staging-hub.ezra.com/appointments.
                <br>17. Search the Appointments table by the member email and verify
                that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case has a high prio because it introduces
                additional functionality that can impact patient's health and
                updates final price.
            </td>
        </tr>
        <tr>
            <td>13</td>
            <td>
                Schedule <strong>MRI Scan with Heart & Lungs CT Scan</strong>
                add-on with "Yes" for
                <strong>calcium score greater than 10</strong> in the
                questionnaire - appointment should be displayed in the User
                Facing Portal.
                <br>1. Log in to https://myezra-staging.ezra.com/.
                <br>2. Click "Book a scan" button.
                <br>3. Select "MRI Scan" and "Heart & Lungs CT Scan".
                <br>4. Click "Continue" button.
                <br>5. Select "Yes" for calcium score greater than 10 in the popup
                questionnaire.
                <br>6. Click "Submit" button.
                <br>7. Click "Continue Without Heart Calcium" button.
                <br>8. Select a state.
                <br>9. Select a location.
                <br>10. Fill in Additional Scheduling Information.
                <br>11. Select a date (or 3 different dates) and 3 time slots.
                <br>12. Click "Continue" button.
                <br>13. Fill in payment card details.
                <br>14. Click "Continue" button.
                <br>15. Verify that "Begin Medical Questionnaire" button is
                displayed.
                <br>16. Log in and go to https://staging-hub.ezra.com/appointments.
                <br>17. Search the Appointments table by the member email and verify
                that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case has a high prio because it introduces
                additional functionality that can impact patient's health and
                updates final price.
            </td>
        </tr>
        <tr>
            <td>14</td>
            <td>
                Schedule <strong>MRI Scan with Heart & Lungs CT Scan</strong>
                add-on with <strong>all</strong> "No" in the questionnaire -
                appointment should be displayed in the User Facing Portal.
                <br>1. Log in to https://myezra-staging.ezra.com/.
                <br>2. Click "Book a scan" button.
                <br>3. Select "MRI Scan" and "Heart & Lungs CT Scan".
                <br>4. Click "Continue" button.
                <br>5. Select "No" for all questions in the popup questionnaire.
                <br>6. Click "Submit" button.
                <br>7. Select a state.
                <br>8. Select a location.
                <br>9. Fill in Additional Scheduling Information.
                <br>10. Select a date (or 3 different dates) and 3 time slots.
                <br>11. Click "Continue" button.
                <br>12. Fill in payment card details.
                <br>13. Click "Continue" button.
                <br>14. Verify that "Begin Medical Questionnaire" button is
                displayed.
                <br>15. Log in and go to https://staging-hub.ezra.com/appointments.
                <br>16. Search the Appointments table by the member email and verify
                that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
            </td>
        </tr>
        <tr>
            <td>15</td>
            <td>
                Schedule <strong>Heart & Lungs CT Scan</strong> with
                <strong>all</strong> "No" in the questionnaire - appointment
                should be displayed in the User Facing Portal.
                <br>1. Log in to https://myezra-staging.ezra.com/.
                <br>2. Click "Book a scan" button.
                <br>3. Select "Heart & Lungs CT Scan".
                <br>4. Click "Continue" button.
                <br>5. Select "No" for all questions in the popup questionnaire.
                <br>6. Click "Submit" button.
                <br>7. Select a state.
                <br>8. Select a location.
                <br>9. Fill in Additional Scheduling Information.
                <br>10. Select a date (or 3 different dates) and 3 time slots.
                <br>11. Click "Continue" button.
                <br>12. Fill in payment card details.
                <br>13. Click "Continue" button.
                <br>14. Verify that "Begin Medical Questionnaire" button is
                displayed.
                <br>15. Log in and go to https://staging-hub.ezra.com/appointments.
                <br>16. Search the Appointments table by the member email and verify
                that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
            </td>
        </tr>
        <tr>
            <td>16</td>
            <td>
                Cancel MRI Scan - updated appointment status should be
                displayed in the User Facing Portal.
                <br>1. Log in to https://myezra-staging.ezra.com/.
                <br>2. Click "Cancel" button and confirm cancellation.
                <br>3. Select a cancellation reason (for example: Another
                reason) and fill in the Cancellation Reason (for example: test).
                <br>4. Click "Cancel Scan" button.
                <br>5. Verify that "Your appointment has been cancelled" title
                is displayed.
                <br>6. Log in and go to https://staging-hub.ezra.com/appointments.
                <br>7. Click "Refresh data" icon.
                <br>8. Search the Appointments table by the member email and
                verify that the test appointment status is Cancelled.
            </td>
            <td></td>
            <td>
                This test case is a part of the basic booking flow. It seems
                like cancellation has a delay of ~2min before the status gets
                updated in https://staging-hub.ezra.com/appointments.
            </td>
        </tr>
        <tr>
            <td>17</td>
            <td>
                Schedule MRI Scan with Spine - appointment should be displayed
                in the User Facing Portal.
                <br>1. Log in to https://myezra-staging.ezra.com/.
                <br>2. Click "Book a scan" button.
                <br>3. Select "MRI Scan with Spine".
                <br>4. Click "Continue" button.
                <br>5. Select a state.
                <br>6. Select a location.
                <br>7. Fill in Additional Scheduling Information.
                <br>8. Select a date (or 3 different dates) and 3 time slots.
                <br>9. Click "Continue" button.
                <br>10. Fill in payment card details.
                <br>11. Click "Continue" button.
                <br>12. Verify that "Begin Medical Questionnaire" button is
                displayed.
                <br>13. Log in and go to https://staging-hub.ezra.com/appointments.
                <br>14. Search the Appointments table by the member email and verify
                that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                An assumption was made that 2 most used products are MRI Scan
                and Heart & Lungs CT Scan.
            </td>
        </tr>
        <tr>
            <td>18</td>
            <td>
                Schedule MRI Scan with Skeletal and Neurological Assessment -
                appointment should be displayed in the User Facing Portal.
                <br>1. Log in to https://myezra-staging.ezra.com/.
                <br>2. Click "Book a scan" button.
                <br>3. Select "MRI Scan with Skeletal and Neurological Assessment".
                <br>4. Click "Continue" button.
                <br>5. Select a state.
                <br>6. Select a location.
                <br>7. Fill in Additional Scheduling Information.
                <br>8. Select 2 sets of a date (or 3 different dates) and 3 time
                slots.
                <br>9. Click "Continue" button.
                <br>10. Fill in payment card details.
                <br>11. Click "Continue" button.
                <br>12. Verify that "Begin Medical Questionnaire" button is
                displayed.
                <br>13. Log in and go to https://staging-hub.ezra.com/appointments.
                <br>14. Search the Appointments table by the member email and verify
                that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                An assumption was made that 2 most used products are MRI Scan
                and Heart & Lungs CT Scan.
            </td>
        </tr>
    </tbody>
</table>

### Potential improvement suggestions
1. On https://staging-hub.ezra.com/members add `alt` and `title` html attributes
for all icons (menu, filters). The `title` attribute will display a short
tooltip with additional information when a user hovers over an element. The
`alt` attribute will help users with sight deficiencies that are relying on
screen readers.
2. While selecting date of birth at
https://myezra-staging.ezra.com/sign-up/select-plan it can be helpful to display
a calendar after the input is clicked (for users to be able to click on a date
in addition to just typing it in).
3. While searching for appointment at https://staging-hub.ezra.com/appointments
there is no way to differentiate between MRI Scan with Heart & Lungs CT Scan
add-on and without it, so it can be beneficial to extend the data in ENCOUNTER
TYPE column.
4. While searching the Appointments table at
https://staging-hub.ezra.com/appointments no results are displayed for partial
email search (for example: @sharklasers.com) - it can be beneficial to add
partial email search for the sake of identifying patterns or clusters of
fraudulent emails.

## Thanks
If this script was helpful for you, please give it a **★ Star**
on [GitHub](https://github.com/Marketionist/interview-tasks).
