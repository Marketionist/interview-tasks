# telecom

A set of tests to validate the output messages created in response to incoming
text strings

## Scenario
Tyrell Corporation sends out text and phone call notifications for urgent
product updates to customers, confirms that the customer is correct, and records
that they were notified. If customers do not acknowledge the notification, they
will be notified again some time later, until the notification is acknowledged.

For example, a phone call might proceed as follows:

```
(Customer):         Hello?
(Thinking Machine): This is the Tyrell Corporation. Am I speaking with Wile E. Coyote?
(Customer):         This is he.
(Thinking Machine): Your recent order includes an item that is being recalled...
```

An SMS message chain might entail:

```
(Thinking Machine): This is the Tyrell Corporation. I have an important message for Wile E. Coyote. Is this the correct number?
(Customer):         👍
(Thinking Machine): Your recent order includes an item that is being recalled...
```

## Challenge
1. Write a test plan for this scenario.
2. Implement a test suite for the above scenario using the programming language
    of your choice, and any tools or platforms you like.
3. What would an advanced black box test suite look like?

## Solution
Let's split the task in 2 parts: test cases for the **phone call** and for
**SMS message**, and then write some JavaScript code to cover those up.

### Test cases - phone call
1. If the input is `Hello?` - the output should be `This is the Tyrell
Corporation. Am I speaking with Wile E. Coyote?`.
2. If the input is `This is he.` - the output should be `Your recent order
includes an item that is being recalled...`.

### Test cases - SMS message chain
1. If the input is empty - the output should be `This is the Tyrell Corporation.
    I have an important message for Wile E. Coyote. Is this the correct number?`
2. If the input is `👍` - the output should be `Your recent order includes an
    item that is being recalled...`.

### Assumptions & trade-offs
As we treat the system as a black box and for the sake of simplicity we will
emulate the output of the system with the simple functions that will return
selected messages when called with particular incoming text strings.

An advanced black box test suite will include much more test cases to test
different wording used by customers. You can observe some variants of wording
inside `GREETINGS` and `CONFIRMATIONS` arrays in
https://github.com/Marketionist/interview-tasks/blob/master/telecom/messages/messages.js.

### Code
You can see the main service module code in
https://github.com/Marketionist/interview-tasks/tree/master/telecom/index.js.

### Tests
Tests can be found in
https://github.com/Marketionist/interview-tasks/tree/master/telecom/spec.

### Linting
Also this solution utilizes linting - the checks can be triggered by running
`npm run lint`, you can see the config in
https://github.com/Marketionist/interview-tasks/tree/master/telecom/.eslintrc.json.

## Supported versions
Should work on any [Node.js](http://nodejs.org/) version >=8.6.x. Tested on
Node.js 12.13.1.

## Installation local
1. Install [Node.js](http://nodejs.org/) 12.x.x (LTS)
2. Clone this repository `git clone https://github.com/Marketionist/interview-tasks.git`
3. Go to telecom folder: `cd interview-tasks/telecom/`
4. Install all dependencies: `npm install`
5. Run linting `npm run lint`
6. Run tests: `npm test`

## Thanks
If this script was helpful for you, please give it a **★ Star**
on [github](https://github.com/Marketionist/interview-tasks).
