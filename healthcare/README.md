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

    > Note: Member users can be created on a Member Facing Portal without any
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

## Thanks
If this script was helpful for you, please give it a **★ Star**
on [GitHub](https://github.com/Marketionist/interview-tasks).
