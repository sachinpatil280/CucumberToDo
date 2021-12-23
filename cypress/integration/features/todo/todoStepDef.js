const { Given, Then } = require('cypress-cucumber-preprocessor/steps')

Given('I open todo application', () => {
  cy.visit(Cypress.env('url'))
})

Then('Validate list with {string} items are saved', function (val) {
  if (val == 1) {
    cy.get(`.todo-list li:nth-child(1) label`).and(
      'contain',
      this.data.singleItemList
    )
  } else if (val === 'multiple') {
    var len = this.data.multipleItemList.length
    for (let i = 0; i < len; i++) {
      cy.get(`.todo-list li:nth-child(${i + 1}) label`).and(
        'contain',
        this.data.multipleItemList[i]
      )
    }
    cy.get('.todo-list li').should('have.length', len)
  }
})

When('I create todo list with {string} items', function (val) {
  if (val == 1) {
    cy.get('.new-todo')
      .type(this.data.singleItemList)
      .type('{enter}')
  } else if (val === 'multiple') {
    this.data.multipleItemList.forEach(function (item) {
      cy.get('.new-todo')
        .type(item)
        .type('{enter}')
    })
  }
})

Then('Validate length of saved list is {int}', function (val) {
  cy.get('.todo-list li').should('have.length', val)
})

Then('I remove item from todo list', () => {
  cy.get('.todo-list li:nth-child(1)')
    .find('.destroy')
    .invoke('show')
    .click()
})

Then('Mark an entry as {string}', val => {
  cy.get(':nth-child(1) > .view > .toggle').click()
})

Then('Validate entry is marked completed and check box is checked', () => {
  cy.get('.todo-list li')
    .filter('.completed')
    .should('have.length', 1)
    .and('contain', 'grocery')
    .find('.toggle')
    .should('be.checked')
})

Then('Validate Toggling is working and task is not marked as completed', () => {
  cy.get('.todo-list li')
    .should('not.have.class', '.completed')
    .and('contain', 'grocery')
    .find('.toggle')
    .should('not.be.checked')
})

Then('Remove completed entry from list', () => {
  cy.get('.todo-list li:nth-child(1)')
    .find('.destroy')
    .invoke('show')
    .click()
})

Then('Validate entry is removed from list', () => {
  cy.get('.todo-list li').should('not.exist')
})

Then('Remove all completed task by clicking on Clear completed button', () => {
  cy.get('.clear-completed').click()
})

Then('Validate completed tasks are removed', () => {
  cy.get('.todo-list li')
    .filter('.completed')
    .should('have.length', 0)
})

Then('{string} list should be empty', val => {
  if (val === 'ToDo') {
    cy.get('.todo-list li').should('not.exist')
  } else if (val === 'Completed') {
    cy.get('.completed').should('not.exist')
  }
})

Then('Validate number of items', function () {
  var len = this.data.multipleItemList.length
  cy.get('.footer>span').should('contain', `${len - 1}`)
})

Then('Validate length of list with {string} items', function (val) {
  if (val == 1) {
    cy.get('.footer>span').should('contain', 1)
  } else if (val === 'multiple') {
    var len = this.data.multipleItemList.length
    // cy.wait(2)
    cy.get('.footer>span>strong').should('have.text', `${len}`)
    // cy.get('.footer>span>strong').should('contain', `${len - 1}`)
  }
})

Then('I double click on the entry to update', function () {
  cy.contains(this.data.multipleItemList[0]).dblclick()
})

Then('I update the title of task', function () {
  cy.get('.editing')
    .clear()
    .type(this.data.updatedValue)
    .type('{enter}')
})

Then('Validate updated entry', function () {
  cy.contains(this.data.updatedValue)
    .should('be.visible')
    .and('have.length', 1)
})

And('I click on Completed Link', function () {
  cy.get('.filters a[href="#/completed"]').click()
})

And('I clear the selected entry', function () {
  cy.get('.editing').clear()
})

And('I double click on first entry to update', function () {
  cy.get('.todo-list li').dblclick
})

And('I press {string} button', function () {
  cy.get('.todo-list li:nth-child(1)').type('{esc}')
})
