NOTE 
What's Special:

Easy Code Structure: We've organized our code in a way that makes it simple to understand. It's like arranging things neatly on a shelf so that you can find them easily.

TypeScript Magic: We used TypeScript, a tool that helps us write code with fewer mistakes. Think of it as having a spell-checker for our code!

Hooks for Smooth Actions: We've used something called "hooks" to make your interactions smooth. It's like using shortcuts to get things done faster.

Secure Access with JWT: For security, we use JWT (don't worry about the technical name). It's like a secret code that only you and the app know, making sure your to-do list is safe.




# Project Overview

This repository comprises a suite of APIs designed to facilitate task and subtask management, all secured through user authentication via JWT tokens. The APIs offer functionalities such as creating tasks, retrieving user tasks, updating task details, and soft deletion of tasks. While some functionalities are fully implemented, work is still ongoing for the subtask-related features.

## Implemented APIs

### 1. Create Task

Enables the creation of a new task with specified details like title, description, due date, and associates it with the authenticated user through a JWT token.

### 2. Get All User Tasks

Retrieves all tasks associated with the authenticated user, providing options for filtering based on factors like priority, due date, and pagination.

### 3. Update Task

Allows the updating of task details such as due date and status ("TODO" or "DONE") for a specified task associated with the authenticated user.

### 4. Delete Task (Soft Deletion)

Facilitates the soft deletion of a specified task associated with the authenticated user.

## Work in Progress

### 1. Create Subtask

Currently under development, this feature aims to enable the creation of subtasks associated with a specific task.

### 2. Get All User Subtasks

Work is ongoing to implement the retrieval of all subtasks associated with the authenticated user, potentially allowing for filtering based on task ID.

### 3. Update Subtask

In progress is the development of the ability to update the status of a specified subtask.






### 4. Delete Subtask (Soft Deletion)

Work is underway to implement the soft deletion functionality for specified subtasks.

Please be aware that these subtask-related features are still in development and may require additional time for completion.
