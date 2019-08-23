import { manager } from './manager.js';

const displayHandler = (() => {

  function newProjectBtn() {
    let projectsHeader = document.querySelector(".projects-header");
    let btn = document.createElement("button");
    btn.innerText = "New";
    btn.classList.add("btn");
    btn.classList.add("project-btn");
    btn.addEventListener("click", function() {
      // Add or remove new project form if it exists
      if (document.querySelector("#new-project-form")) {
        document.querySelector("#new-project-form").remove();
      }
      else {
        projectsHeader.appendChild(createProjectForm());
      }
    });
    projectsHeader.appendChild(btn);
  }

  function createProjectForm() {

    // Form label and input
    let form = document.createElement("form");
    form.id = "new-project-form";
    let projectLabel = document.createElement("p");
    projectLabel.classList.add("detail-label");
    projectLabel.innerText = "Project Name";
    let projectName = document.createElement("input");
    projectName.id = "new-project-name";
    projectName.type = "text";
    // Form submit
    let btn = document.createElement("button");
    btn.innerText = "Create";
    // Need to specify button type as button because submit is default
    btn.type = "button";
    btn.addEventListener("click", function() {
      newProject();
      let projectName = document.querySelector("#new-project-name");
    });
    btn.classList.add("btn");
    // Appending to form
    form.appendChild(projectLabel);
    form.appendChild(projectName);
    form.appendChild(btn);

    return form;
  }

  function newProject() {
    let projectName = document.querySelector("#new-project-name").value;
    if (isEmpty(projectName)) {
      window.alert("Project name is empty!");
    }
    else {
      manager.addProject(projectName);
      document.querySelector("#new-project-form").remove();
      listProjects();
    }
  }

  function listProjects() {
    let projectListNode = document.querySelector(".projects-list");
    // Clear already shown projects
    while (projectListNode.firstChild) {
      projectListNode.removeChild(projectListNode.firstChild);
    }
    // Gather and add every project
    let projectList = manager.getProjects();
    projectList.forEach(function(project, index) {
      let projectNode = document.createElement("div");
      projectNode.classList.add("project");
      let projectTitle = document.createElement("span");
      projectTitle.innerText = project.name;
      projectTitle.addEventListener("click", function() {
        manager.setActive(index);
        listTodos();
      });
      projectNode.appendChild(projectTitle);
      projectListNode.appendChild(projectNode);
    });
  }

  function listTodos() {
    let todoListNode = document.querySelector(".todos-list");
    // Clear already shown todos
    while (todoListNode.firstChild) {
      todoListNode.removeChild(todoListNode.firstChild);
    }
    // Gather and add every todo
    let todoList = manager.getActiveTodos();
    todoList.forEach(function(todo, index) {
      let todoNode = document.createElement("div");
      todoNode.classList.add("todo");
      // Todo Header
      let todoTop = document.createElement("div");
      todoTop.classList.add("todo-top");
      let todoTitle = document.createElement("span");
      todoTitle.classList.add("todo-title");
      todoTitle.innerText = todo.title;
      switch (todo.priority) {
        case 'High':
          todoTitle.classList.add("prio-high");
          break;
        case 'Medium':
          todoTitle.classList.add("prio-medium");
          break;
        case 'Low':
          todoTitle.classList.add("prio-low");
          break;
        case 'Completed':
          todoTitle.classList.add("prio-complete");
          break;
      }
      let todoDate = document.createElement("span");
      todoDate.classList.add("todo-date");
      todoDate.innerText = todo.dueDate;
      todoTop.appendChild(todoTitle);
      todoTop.appendChild(todoDate);
      todoTop.appendChild(createDeleteTodoBtn(index));
      // Add event listener to display the todo details
      todoTop.addEventListener("click", function() {
        todoDetails(todoNode, todo);
      });
      todoNode.appendChild(todoTop);
      todoListNode.appendChild(todoNode);
    });
  }

  function todoDetails(node, todo) {
    // Remove any already opened details
    let openDetails = document.querySelectorAll(".details");
    openDetails.forEach(function(opened) {
      opened.remove();
    });

    // Actually create and add the new details
    let details = document.createElement("div");
    details.classList.add("details");
    let priorityLabel = document.createElement("p");
    priorityLabel.classList.add("detail-label");
    priorityLabel.innerText = "Priority:";
    let priority = document.createElement("p");
    priority.innerText = todo.priority;
    let dueDateLabel = document.createElement("p");
    dueDateLabel.classList.add("detail-label");
    dueDateLabel.innerText = "Due Date:";
    let dueDate = document.createElement("p");
    dueDate.innerText = todo.dueDate;
    let notesLabel = document.createElement("p");
    notesLabel.classList.add("detail-label");
    notesLabel.innerText = "Notes:";
    let notes = document.createElement("p");
    notes.innerText = todo.notes;
    details.appendChild(priorityLabel);
    details.appendChild(priority);
    details.appendChild(dueDateLabel);
    details.appendChild(dueDate);
    details.appendChild(notesLabel);
    details.appendChild(notes);

    // Placeholder for changing priority pseudo-form

    // Appending
    node.appendChild(details);
  }

  function createDeleteTodoBtn(index) {
    // Similar to newProjectBtn()
    let btn = document.createElement("button");
    btn.innerText = "Delete";
    btn.addEventListener("click", function() {
      deleteTodo(index);
    });
    btn.classList.add("btn");
    btn.classList.add("delete-btn");

    // Return button for appending
    return btn;
  }

  function deleteTodo(index) {
    let project = manager.getActive();
    project.deleteTodo(index);
    listTodos();
  }

  function setup() {
    newProjectBtn();
    listProjects();
  }

  // Check if string is empty
  // See: https://stackoverflow.com/questions/154059/how-to-check-empty-undefined-null-string-in-javascript
  function isEmpty(str) {
    return (!str || /^\s*$/.test(str));
  }

  return { setup, listProjects };

})();

export {
  displayHandler
}