import { manager } from './manager.js';

const displayHandler = (() => {

  function newProjectBtn() {
    let projectsHeader = document.querySelector(".projects-header");
    let btn = document.createElement("button");
    btn.innerText = "New";
    btn.onclick = showProjectForm;
    btn.classList.add("btn");
    btn.classList.add("project-btn");
    projectsHeader.appendChild(btn);
  }

  function showProjectForm() {
    let projectsHeader = document.querySelector(".projects-header");
    let form = document.createElement("form");
  }

  function listProjects() {
    let projectListNode = document.querySelector(".projects-list");
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
    while (todoListNode.firstChild) {
      todoListNode.removeChild(todoListNode.firstChild);
    }
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
    priority.innerText = todo.dueDate;
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

  function setup() {
    newProjectBtn();
    listProjects();
  }

  return { setup, listProjects };

})();

export {
  displayHandler
}