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
  * [Solution for Question 1 Part 1 and 2](#solution-for-question-1-part-1-and-2)
  * [Solution for Question 2 Part 1 and 2](#solution-for-question-2-part-1-and-2)
  * [Solution for Question 2 Part 3](#solution-for-question-2-part-3)
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
OR if you have an older OS that does not support the latest Google Chrome
(will download Firefox only):
```bash
npm run install:test-dependencies-old
```

## Running tests

- To launch end-to-end tests run:
    ```bash
    MEMBER_LOGIN='...' MEMBER_PASS='...' USER_LOGIN='...' USER_PASS='...' npm run test:e2e
    ```

    > Note: multiple member users can be created on a Member Facing Portal
    > without any concerns.

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

1. As there is a limited amount of time and to optimize the efforts, only 3
first happy path test cases will be automated for now.

2. An assumption was made that 2 most used products are MRI Scan and Heart &
Lungs CT Scan, thus they were covered as a priority 1.

3. As we do not have a list of environments (browsers/operating systems) that
should be supported, an assumption will be made that the booking flow should
work in Google Chrome as it is the most popular and widely used browser.

4. For the sake of simplicity "All Available" option is used for State on
https://myezra-staging.ezra.com/book-scan/schedule-scan.

5. For the sake of simplicity 28th day of the next month and 3 first time slots
are used on https://myezra-staging.ezra.com/book-scan/schedule-scan.

6. Additional verifications for price changes should be added for
https://myezra-staging.ezra.com/book-scan/reserve-appointment:
- After "Continue Without Heart Calcium" is selected.
- After entering a promo code.
But they are less important than patient's health, so a trade-off was made.

7. As the amount of tests is not big, for now the concurrency for test
execution will be set to 1. It can easily be extended later on. For future
scalability please see `projects` inside
[e2e-config.ts](https://github.com/Marketionist/interview-tasks/blob/master/healthcare/e2e-config.ts).

8. Additionally all code is checked for styling quality by lint and husky on
each pre-commit.

### Test cases

> Note: payment card details (https://docs.stripe.com/testing):

> Card number: 4242 4242 4242 4242

> Expiration (MM/YY): 12/34

> Security code: 567

> Country: United States

> ZIP code: 12345

#### Solution for Question 1 Part 1 and 2

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
                <br>3. Fill in Date of birth (for example: 10-10-1990) and
                select sex at birth (for example: Male) - this step is needed
                only for a new user setup.
                <br>4. Select "MRI Scan".
                <br>5. Click "Continue" button.
                <br>6. Select a state (for example: New York or leave All
                Available).
                <br>7. Select a location (for example: QA Automation Center:
                12345, New York, NY 12345).
                <br>8. Fill in Additional Scheduling Information (for example:
                Test).
                <br>9. Select a date (or 3 different dates) and 3 time slots
                (for example: Nov 7, 2025 • 12:01 AM; Nov 7, 2025 • 12:01 PM;
                Nov 7, 2025 • 11:31 PM).
                <br>10. Click "Continue" button.
                <br>11. Fill in payment card details.
                <br>12. Click "Continue" button.
                <br>13. Verify that "Begin Medical Questionnaire" button is
                displayed.
                <br>14. Log in and go to https://staging-hub.ezra.com/appointments.
                <br>15. Search the Appointments table by the member email (for
                example: msbqxqan@sharklasers.com or fzmfrxmt@sharklasers.com)
                and verify that the test appointment is displayed and its status
                is Pending.
            </td>
            <td>
                https://github.com/Marketionist/interview-tasks/blob/master/healthcare/tests/e2e/booking-flow-e2e-spec.ts#L20
                <br>Video recording of this test run can be downloaded at:
                https://github.com/Marketionist/interview-tasks/blob/master/healthcare/videos/Schedule_MRI_Scan-video.webm.
            </td>
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
                <br>5. Select "Yes" for all questions in the popup
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
                <br>displayed.
                <br>16. Log in and go to https://staging-hub.ezra.com/appointments.
                <br>17. Search the Appointments table by the member email and
                verify that the test appointment is displayed and its status is
                Pending.
            </td>
            <td>
                https://github.com/Marketionist/interview-tasks/blob/master/healthcare/tests/e2e/booking-flow-e2e-spec.ts#L37
                <br>Video recording of this test run
                can be downloaded at:
                https://github.com/Marketionist/interview-tasks/blob/master/healthcare/videos/Schedule_Heart_Lungs_CT_Scan-video.webm.
            </td>
            <td>
                This test case is selected as a high priority because it
                introduces additional functionality that can impact patient's
                health and updates final price.
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
                <br>5. Select "Yes" for all questions in the popup
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
                <br>displayed.
                <br>16. Log in and go to https://staging-hub.ezra.com/appointments.
                <br>17. Search the Appointments table by the member email and
                verify that the test appointment is displayed and its status is
                Pending.
            </td>
            <td>
                https://github.com/Marketionist/interview-tasks/blob/master/healthcare/tests/e2e/booking-flow-e2e-spec.ts#L55
                <br>Video recording of this test run can be
                downloaded at:
                https://github.com/Marketionist/interview-tasks/blob/master/healthcare/videos/Schedule_MRI_Scan_with_Heart_Lungs_CT_Scan_add-on-video.webm.
            </td>
            <td>
                This test case extends the basic booking flow with adding an
                add-on. It is selected as a high priority because it introduces
                additional functionality that can impact patient's health and
                updates final price.
                <br>It seems like booking has a delay of up to 4min before the
                new appointment appears in
                https://staging-hub.ezra.com/appointments.
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
                <br>17. Search the Appointments table by the member email and
                verify that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case is selected as a high priority because it
                introduces additional functionality that can impact patient's
                health and updates final price.
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
                <br>5. Select "Yes" for cardiac stent in the popup
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
                <br>17. Search the Appointments table by the member email and
                verify that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case is selected as a high priority because it
                introduces additional functionality that can impact patient's
                health and updates final price.
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
                <br>17. Search the Appointments table by the member email and
                verify that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case is selected as a high priority because it
                introduces additional functionality that can impact patient's
                health and updates final price.
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
                <br>17. Search the Appointments table by the member email and
                verify that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case is selected as a high priority because it
                introduces additional functionality that can impact patient's
                health and updates final price.
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
                <br>5. Select "Yes" for calcium score greater than 10 in the
                popup questionnaire.
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
                <br>17. Search the Appointments table by the member email and
                verify that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case is selected as a high priority because it
                introduces additional functionality that can impact patient's
                health and updates final price.
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
                <br>17. Search the Appointments table by the member email and
                verify that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case has a high priority because it introduces
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
                <br>5. Select "Yes" for cardiac stent in the popup
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
                <br>17. Search the Appointments table by the member email and
                verify that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case has a high priority because it introduces
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
                <br>17. Search the Appointments table by the member email and
                verify that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case has a high priority because it introduces
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
                <br>17. Search the Appointments table by the member email and
                verify that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case has a high priority because it introduces
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
                <br>5. Select "Yes" for calcium score greater than 10 in the
                popup questionnaire.
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
                <br>17. Search the Appointments table by the member email and
                verify that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                This test case has a high priority because it introduces
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
                <br>16. Search the Appointments table by the member email and
                verify that the test appointment is displayed and its status is
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
                <br>16. Search the Appointments table by the member email and
                verify that the test appointment is displayed and its status is
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
                This test case is a part of the basic booking flow.
                <br>It seems like cancellation has a delay of up to 4min before
                the status gets updated in
                https://staging-hub.ezra.com/appointments.
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
                <br>14. Search the Appointments table by the member email and
                verify that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                An assumption was made that 2 most used products are MRI Scan
                and Heart & Lungs CT Scan, so MRI Scan with Spine was moved down
                as a lower priority.
            </td>
        </tr>
        <tr>
            <td>18</td>
            <td>
                Schedule MRI Scan with Skeletal and Neurological Assessment -
                appointment should be displayed in the User Facing Portal.
                <br>1. Log in to https://myezra-staging.ezra.com/.
                <br>2. Click "Book a scan" button.
                <br>3. Select "MRI Scan with Skeletal and Neurological
                Assessment".
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
                <br>14. Search the Appointments table by the member email and
                verify that the test appointment is displayed and its status is
                Pending.
            </td>
            <td></td>
            <td>
                An assumption was made that 2 most used products are MRI Scan
                and Heart & Lungs CT Scan, so MRI Scan with Skeletal and
                Neurological Assessment was moved down as a lower priority.
            </td>
        </tr>
    </tbody>
</table>

#### Solution for Question 2 Part 1 and 2

Encounter id (`encounterId`) is exposed as a parameter in Medical Questionnaire
URL (for example: https://myezra-staging.ezra.com/medical-questionnaire?direct=true&clearData=true&extraData={%22encounterId%22:%2280d6408d-7b1f-4ace-b493-fc5782502cdb%22}).
This can potentially lead to possibility of guessing (or brute-forcing) other
user's Encounter id and getting access to medical data.

<table>
    <thead>
        <tr>
            <th>#</th>
            <th>Test case</th>
            <th>HTTP request</th>
            <th>Comments</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>
                Send request with random <strong>encounterId</strong>.
                <br>1. Log in to https://myezra-staging.ezra.com/ as User2 (for
                example: fzmfrxmt@sharklasers.com).
                <br>2. Start a Medical Questionnaire.
                <br>3. Open Network tab in browser Developer Tools and check
                "Preserve log".
                <br>4. Update encounterId parameter in current URL with some
                random characters (for example: https://myezra-staging.ezra.com/medical-questionnaire?direct=true&clearData=true&extraData={%22encounterId%22:%22aacd9827-d6cd-422a-a9e9-424138474264%22}).
                <br>5. Verify the requests / responses in Network tab.
                <br>6. Verify that User2 is logged out.
            </td>
            <td>GET https://myezra-staging.ezra.com/medical-questionnaire?direct=true&clearData=true&extraData={%22encounterId%22:%22aacd9827-d6cd-422a-a9e9-424138474264%22}</td>
            <td>
                Using URL with random encounterId while logged in as User2.
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td>
                Send request with <strong>encounterId</strong> of another user.
                <br>1. Log in to https://myezra-staging.ezra.com/ as User1 (for
                example: msbqxqan@sharklasers.com).
                <br>2. Start a Medical Questionnaire.
                <br>3. Copy current URL (for example:
                https://myezra-staging.ezra.com/medical-questionnaire?direct=true&clearData=true&extraData={%22encounterId%22:%2280d6408d-7b1f-4ace-b493-fc5782502cdb%22}).
                <br>4. Open a new browser window in incognito mode.
                <br>5. Log in to https://myezra-staging.ezra.com/ as User2 (for
                example: fzmfrxmt@sharklasers.com).
                <br>6. Open Network tab in browser Developer Tools and check
                "Preserve log".
                <br>7. Open https://myezra-staging.ezra.com/medical-questionnaire?direct=true&clearData=true&extraData={%22encounterId%22:%2280d6408d-7b1f-4ace-b493-fc5782502cdb%22}.
                <br>8. Verify the requests / responses in Network tab.
                <br>9. Verify that User2 is logged out.
            </td>
            <td>GET https://myezra-staging.ezra.com/medical-questionnaire?direct=true&clearData=true&extraData={%22encounterId%22:%2280d6408d-7b1f-4ace-b493-fc5782502cdb%22}</td>
            <td>
                Using URL from User1 while logged in as User2.
            </td>
        </tr>
        <tr>
            <td>3</td>
            <td>
                Send request with <strong>encounterId</strong> of another user
                and <strong>clearData</strong> set to false.
                <br>1. Log in to https://myezra-staging.ezra.com/ as User1.
                <br>2. Start a Medical Questionnaire.
                <br>3. Copy current URL.
                <br>4. Open a new browser window in incognito mode.
                <br>5. Log in to https://myezra-staging.ezra.com/ as User2.
                <br>6. Open Network tab in browser Developer Tools and check
                "Preserve log".
                <br>7. Open https://myezra-staging.ezra.com/medical-questionnaire?direct=true&clearData=false&extraData={%22encounterId%22:%2280d6408d-7b1f-4ace-b493-fc5782502cdb%22}.
                <br>8. Verify the requests / responses in Network tab.
                <br>9. Verify that User2 is logged out.
            </td>
            <td>GET https://myezra-staging.ezra.com/medical-questionnaire?direct=true&clearData=false&extraData={%22encounterId%22:%2280d6408d-7b1f-4ace-b493-fc5782502cdb%22}</td>
            <td>
                Using URL with clearData=false from User1 while logged in as
                User2.
            </td>
        </tr>
        <tr>
            <td>4</td>
            <td>
                Send request with <strong>encounterId</strong> of another user
                and <strong>clearData</strong> set to false and
                <strong>direct</strong> set to false.
                <br>1. Log in to https://myezra-staging.ezra.com/ as User1.
                <br>2. Start a Medical Questionnaire.
                <br>3. Copy current URL.
                <br>4. Open a new browser window in incognito mode.
                <br>5. Log in to https://myezra-staging.ezra.com/ as User2.
                <br>6. Open Network tab in browser Developer Tools and check
                "Preserve log".
                <br>7. Open https://myezra-staging.ezra.com/medical-questionnaire?direct=false&clearData=false&extraData={%22encounterId%22:%2280d6408d-7b1f-4ace-b493-fc5782502cdb%22}.
                <br>8. Verify the requests / responses in Network tab.
                <br>9. Verify that User2 is logged out.
            </td>
            <td>GET https://myezra-staging.ezra.com/medical-questionnaire?direct=false&clearData=false&extraData={%22encounterId%22:%2280d6408d-7b1f-4ace-b493-fc5782502cdb%22}</td>
            <td>
                Using URL with clearData=false and direct=false from User1 while
                logged in as User2.
            </td>
        </tr>
    </tbody>
</table>

#### Solution for Question 2 Part 3

Assigning each user a separate Bearer token is a good practice. It grants access
to the endpoint to whoever "bears" or possesses it. Using Authorization header
with Bearer token (`Authorization: Bearer ...`) in HTTP authentication helps to
control the access to protected resources/endpoints.

Testing the existing (and especially new) endpoints with different combinations
of parameters can be a good idea. Also to check for XSS attacks vulnerability
all inputs can be tested with a code like this:
`<script>alert('Code executed - XSS risk!');</script>`.

There is always a risk that hackers can obtain security tokens or even session
cookies. So reliable and fast rotation processes with clear playbooks should be
created. In case if emergency rotation is invoked users that are currently
logged in or are using hardcoded credentials can lose their access, so robust
communication strategies and graceful fallbacks should be implemented.

### Potential improvement suggestions

1. While selecting date of birth at
https://myezra-staging.ezra.com/sign-up/select-plan it can be helpful to display
a calendar after the input is clicked (for users to be able to click on a date
in addition to just typing it in).
2. While selecting appointment date at
https://myezra-staging.ezra.com/book-scan/schedule-scan it can be helpful to
display an input in addition to a calendar (for users to be able to type it in
addition to just clicking).
3. While searching for appointment at https://staging-hub.ezra.com/appointments
there is no way to differentiate between MRI Scan with Heart & Lungs CT Scan
add-on and without it, so it can be beneficial to extend the data that is
displayed in APPOINTMENT TYPE/ENCOUNTER TYPE columns.
4. On https://staging-hub.ezra.com/members add `alt` and `title` html attributes
for all icons (menu, filters). The `title` attribute will display a short
tooltip with additional information when a user hovers over an element. The
`alt` attribute will help users with sight deficiencies that are relying on
screen readers.
5. While searching the Appointments table at
https://staging-hub.ezra.com/appointments no results are displayed for partial
email search (for example: @sharklasers.com) - it can be beneficial to add
partial email search for the sake of identifying patterns or clusters of
fraudulent emails.

## Thanks

If this collection of code examples was helpful to you, please give it a
**★ Star** on [GitHub](https://github.com/Marketionist/interview-tasks).
