# Gelato Assignment

## Overview
This project is used to test [ToDo Application](https://todomvc.com/examples/react/#/). The automation uses Cypress Tool. 
Test cases are written in JavaScript with Cucumber BDD framework and Chai assertions. 
Test cases are specified in `cypress\integration\features` folder.
Tool uses multiple-cucumber-html-reporter tool for generating report.


## Installation

```
## install all dependencies from the root directory
npm install
```

## Opening Cypress GUI

```
# Open Cypress GUI
npm run cypress:open
```

## Running from the CLI

Install dependencies with `npm install` or `npm ci`

See scripts in `package.json` to run the tests.

* `cypress:info` - Displays Cypress information.
* `test:run` - Runs Cypress test in headless mode.
* `test:run-headed` - Runs Cypress test in head mode.
* `test:chrome` - Runs Cypress test in chrome browser in head mode.

## Report Generation
Run below command from `root folder` to generate Cucumber-HTML report.

```
node cypress/cucumber-html-report.js
```

Reports are generated at below location
```
.\cypress\report\index.html
```


## Creating Docker Image using `Dockerfile` from root directory and Running Docker Tests 
For creating docker image, use below command: 
```
docker build -t gelato_test:1.0.0 .
```

To run tests from created docker image, use below command:

For Windows:
```
docker run -i -v “%cd%”:/gelato -t gelato_test:1.0.0
```

For Linux:
```
docker run -i -v “$PWD”:/gelato -t gelato_test:1.0.0
```