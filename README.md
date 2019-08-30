# Time Todo It

In this repository you'll find a todo list web app, where you can create your own projects and assign a todo list to each one to keep track of what needs to be done for each project.

Creation of this app was done to further practice using dynamically created DOM elements of JS, JS modules, npm with external modules, and webpack, and localStorage.

## Important

Before using this app, it is important to note that projects and todos are saved into **localStorage**. If localStorage is unavailable, then the app will still function, but will not save so be mindful of refreshing the page or closing your browser. Alternatively, localStorage may be blocked if settings such as blocking of third-party cookies in Chrome are enabled, so make sure to disable such settings to fully take advantage of the saving feature.

## Usage Notes

### Basic Introductory Walkthrough

1. When used for the first time, the app will automatically assign you the Default project.
2. Let's make our own by opening the new project form by pressing New under the Projects column.
3. Enter a project name and press the Create button.
4. Click the project name and it will be highlighted in green as the active project.
5. Now let's add to the project's Todo List by first pressing the New button in the Todo List column.
6. Fill out the corresponding information and select the priority as High. All entries are required except for Notes.
7. Press the Create button and check out your newly added Todo.
8. Press on the header bar for your new Todo to view its details.
9. Now you can view its details along with updating its priority, so select Low as your new for your Todo.
10. Press the Update button and notice how your new priority has appropriately changed your Todo title color from red to blue, and the priority in its details from High to Low.
11. Now let's delete the Todo in this current project by pressing the Delete button next to it.
12. Do the same thing once again, but this time for the project.
13. You've worked through the app, so give yourself a pat on the back!

*** Projects

* There will always be at least one Default project.
* New projects are created using the New button in the Projects column.
* The active project is highlighted in green, clicking a project name will set it as active.
* Only one project will be active at a time, selecting it as active will display its corresponding Todos.
* If you delete the active project, the active project will be reset to Default.

*** Todos

* Todos will only be displayed from and added to the active project.
* Attempting to add a todo with missing required inputs will create an alert stating there is a missing entry.
* All additional information details for each Todo can be found by clicking on a Todo bar.
* When updating the priority of a Todo, there is an additional option to mark it as Completed.
* Todos are sorted in a descending order from oldest to newest for each project.
* Todo names are colored to denote their priority as follows:
  * High - Red
  * Medium - Orange
  * Low - Blue
  * Completed - Green with strikethrough text
* Only one Todo can have its details displayed at a time.

## Additional Notes

* Bundling for this app was done using webpack.
* The following webpack loaders were used:
  * css-loader
  * style-loader
* External libraries obtained for use through npm were:
  * [date-fns](https://date-fns.org/) for Date objects and Date sorting

Check it out [here](https://rgee258.github.io/todo-list/).

This project is done following The Odin Project, which can
be found [here](https://www.theodinproject.com/courses/javascript/lessons/todo-list).
