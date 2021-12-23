const { Given, Then } = require('cypress-cucumber-preprocessor/steps')

Given('I access api request to fetch todo list', () => {
  cy.request(`${Cypress.env('api_url')}`).as('users')
})

Then('Verify response from the GET request', () => {
  cy.get('@users').should(response => {
    expect(response.status).to.eq(200)
    expect(response.body[0].title).not.to.be.null
  })
})

Given('I create todo item for userId 1', function () {
  cy.fixture('testData').then(userdata => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('api_url')}`,
      body: userdata.createTodo
    }).as('createTodo')
  })
})

Then('Verify response contains todo item with unique id', function () {
  cy.get('@createTodo').should(response => {
    expect(response.body.id).to.eq(201)
  })
})

Given('I update todo item', function () {
  cy.fixture('testData').then(userdata => {
    cy.request({
      method: 'PUT',
      url: `${Cypress.env('api_url')}/1`,
      body: userdata.updateTodo
    }).as('updateTodo')
  })
})

Then('Verify response is updated', function () {
  cy.fixture('testData').then(userdata => {
    cy.get('@updateTodo').should(response => {
      expect(response.status).to.eq(200)
      expect(response.body.body).to.eq(userdata.updateTodo['body'])
    })
  })
})

Given('I update Title of existing todo item', function () {
  cy.fixture('testData').then(userdata => {
    cy.request({
      method: 'PATCH',
      url: `${Cypress.env('api_url')}/1`,
      body: userdata.updateTitle
    }).as('updateTitle')
  })
})

Then('Verify item Title is updated', function () {
  cy.fixture('testData').then(userdata => {
    cy.get('@updateTitle').should(response => {
      expect(response.status).to.eq(200)
      expect(response.body.title).to.eq(userdata.updateTitle['title'])
    })
  })
})

Given('I delete an todo item', function () {
  cy.fixture('testData').then(() => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('api_url')}/1`
    }).as('deleteTask')
  })
})

Then('Verify the item is deleted', function () {
  cy.get('@deleteTask').should(response => {
    expect(response.status).to.eq(200)
  })
})

Given('I filter todo items for specific user', function () {
  cy.fixture('testData').then(userdata => {
    var filterUrl = `${Cypress.env('api_url')}/`.concat(
      userdata.filterData['userId']
    )
    cy.request({
      method: 'GET',
      url: filterUrl
    }).as('getUserTodoList')
  })
})

Then('Verify fetched data is for specific user', function () {
  cy.fixture('testData').then(userdata => {
    cy.get('@getUserTodoList').should(response => {
      for (let index = 0; index < response.body.length; index++) {
        expect(response.body[index]['userId']).to.eq(
          parseInt(userdata.filterData['userId'].split('=')[1])
        )
      }
      expect(response.status).to.eq(200)
    })
  })
})
