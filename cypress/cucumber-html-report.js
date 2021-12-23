const report = require('multiple-cucumber-html-reporter')

var today = new Date()
var date =
  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
var time =
  today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
var dateTime = date + ' ' + time

report.generate({
  jsonDir: 'cypress/cucumber-json',
  reportPath: 'cypress/reports',
  hideMetadata: true,
  metadata: {
    browser: {
      name: 'chrome',
      version: '92'
    },
    device: 'Local test machine',
    platform: {
      name: 'ubuntu',
      version: '16.04'
    }
  },
  customData: {
    title: 'Todo App Summary',
    data: [
      { label: 'Project', value: 'Todo App Project' },
      { label: 'Release', value: '1.0' },
      { label: 'Cycle', value: 'Automation Cycle' },
      { label: 'Execution Start Time', value: dateTime }
    ]
  }
})
