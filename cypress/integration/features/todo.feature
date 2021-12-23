Feature: End to End ToDo Application UI Validation

Background: Opening Todo App
Given I open todo application


Scenario: 1) Adding a simple task in the todo list
When I create todo list with "1" items
Then Validate list with "1" items are saved


Scenario: 2) Adding multiple task in the todo list
When I create todo list with "multiple" items
Then Validate list with "multiple" items are saved


Scenario: 3) Removing task from list
When I create todo list with "multiple" items
And I remove item from todo list
Then Validate length of saved list is 2


Scenario: 4) Marking a task as completed in the list 
When I create todo list with "multiple" items
And Mark an entry as "completed"
Then Validate entry is marked completed and check box is checked


Scenario: 5) Marking a task as completed and toggle it back as not completed
When I create todo list with "1" items
And Mark an entry as "completed"
And Validate entry is marked completed and check box is checked
And Mark an entry as "not completed"
Then Validate Toggling is working and task is not marked as completed


Scenario: 6) Removing a task from list that is completed
When I create todo list with "1" items
And Mark an entry as "completed"
And Remove completed entry from list
Then Validate entry is removed from list


Scenario: 7) Clearing the completed task
When I create todo list with "multiple" items
And Mark an entry as "completed"
And Validate entry is marked completed and check box is checked
And Remove all completed task by clicking on Clear completed button
Then Validate completed tasks are removed

# Negative test case to check if there are any tasks when page loads

Scenario: 8) Negative : No tasks present in list when page loads
Then "ToDo" list should be empty

#Negative test case to check if there are any completed tasks when page loads

Scenario: 9) Negative : No task is completed when page loads
Then "Completed" list should be empty

#Negative test case to check there are no completed tasks before marking them as completed
Scenario: 10) Negative : No task is completed before it is marked as completed
When I create todo list with "multiple" items 
Then "Completed" list should be empty


Scenario: 11) Verifying the number of items left after few are completed
When I create todo list with "multiple" items
And Validate length of list with "multiple" items
And Mark an entry as "completed"
And Validate entry is marked completed and check box is checked
Then Validate number of items


Scenario: 12) Edit the task and verify the update
When I create todo list with "multiple" items
And I double click on the entry to update
And I update the title of task
Then Validate updated entry


Scenario: 13) Edit the completed task and verify the update
When I create todo list with "multiple" items
And Mark an entry as "completed"
And Validate entry is marked completed and check box is checked
And I click on Completed Link
And I double click on the entry to update
And I update the title of task
Then Validate updated entry


Scenario: 14) Edit the task, try to clear the text and press Esc button
When I create todo list with "multiple" items
And I double click on the entry to update
And I clear the selected entry
And I press "Esc" button
Then Validate list with "multiple" items are saved