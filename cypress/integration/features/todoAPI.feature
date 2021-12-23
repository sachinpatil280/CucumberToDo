Feature: End to End ToDo Application API Validation


Scenario: To access jsonplaceholder.typicode.com and perform basic api test to fetch users for todo endpoint.
Given I access api request to fetch todo list
Then Verify response from the GET request


Scenario: To create todo item using POST request
Given I create todo item for userId 1
Then Verify response contains todo item with unique id


Scenario: To Update todo item
Given I update todo item
Then Verify response is updated


Scenario: To update todo item partially
Given I update Title of existing todo item
Then Verify item Title is updated


Scenario: To delete todo item.
Given I delete an todo item
Then Verify the item is deleted


Scenario: To filter todo items based on users 
Given I filter todo items for specific user
Then Verify fetched data is for specific user