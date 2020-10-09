# matching-score

A matching score program

## Initial task
Matching Respondents With Projects
Central to the platform is a matching algorithm that matches research
participants with paid opportunities launched by researchers.

We have some respondents/participants data in a text file (respondents.csv
attached) and data attributes we know about them (one respondent per line). We
would like to evaluate whether they match (a good fit) with a project (paid
opportunities) (project.json attached).

Write a matching score function that calculates their likelihood to be picked
based on the following data points:
- Industry
- Job title
- Location (max 100km)

Write a program that will read the full list of respondents and output the
**names, distance and matching score** of matching respondents (within 100km),
sorted by matching score.
Please refer to this
[Wikipedia Article](https://en.wikipedia.org/wiki/Great-circle_distance) to
calculate the distance. Remember to convert degrees to radians when calculating
the distance. Please include some unit tests to cover your code and functions.

## Solution
This program be used locally or built inside CI system - now built in Travis CI

[![Build Status](https://travis-ci.org/Marketionist/interview-tasks.svg?branch=master)](https://travis-ci.org/Marketionist/interview-tasks)

### Code
You can see the main program code in
https://github.com/Marketionist/interview-tasks/tree/master/backend/matching-score/index.js.

> Note: the weight values for `professionalJobTitles`, `professionalIndustry` and
> `distance` can be additionally provided through environment variables:
> - `JOB_TITLE_WEIGHT` (by default 35),
> - `INDUSTRY_WEIGHT` (by default 33),
> - `DISTANCE_WEIGHT` (by default 32).

> For example:
```
JOB_TITLE_WEIGHT=33 INDUSTRY_WEIGHT=33 DISTANCE_WEIGHT=34 node index.js
```

### Tests
And the unit tests in https://github.com/Marketionist/interview-tasks/tree/master/backend/matching-score/spec/test1.spec.js.

### Linting
Also this solution utilizes linting - the checks are run on each build, you can see the config in
https://github.com/Marketionist/interview-tasks/tree/master/backend/matching-score/.eslintrc.json.

## Supported versions
Should work on any [Node.js](http://nodejs.org/) version >=8.6.x. Tested on
Node.js 12.13.1.

## Installation local
1. Install [Node.js](http://nodejs.org/) 12.x.x (LTS)
2. Clone this repository `git clone https://github.com/Marketionist/interview-tasks.git`
3. Go to backend folder: `cd interview-tasks/backend/matching-score/`
4. Install all dependencies: `npm install`
5. Run linting `npm run lint`
6. Run unit tests: `npm test`

## Installation local with Docker
You will need
[Docker for Mac](https://docs.docker.com/docker-for-mac/ "Docker for Mac") or
[Docker for Windows](https://docs.docker.com/docker-for-windows/ "Docker for Windows")
installed to run the tests locally in the container inside Docker image.

To run the tests inside Docker on your local machine follow the next steps:

1. Clone this repository: `git clone https://github.com/Marketionist/interview-tasks.git`

2. Launch your Docker machine

3. Go to repository folder: `cd interview-tasks/backend/matching-score/`

4. Build docker image: `docker build --no-cache -t sample-app .`

5. See that the image was built: `docker images -a | sort | uniq`

6. Run the container: `docker run -it --rm --name=matching-score -p 3000:3000 sample-app`

> Note: you can always see the recent Docker build on Travis CI:
> https://travis-ci.org/Marketionist/interview-tasks

## Thanks
If this script was helpful for you, please give it a **★ Star**
on [github](https://github.com/Marketionist/interview-tasks).
