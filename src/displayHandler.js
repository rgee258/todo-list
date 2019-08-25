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
    projectLabel.classList.add("project-form-label");
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
    clearProjects();
    // Gather and add every project
    let projectList = manager.getProjects();
    projectList.forEach(function(project, index) {
      let projectNode = document.createElement("div");
      projectNode.classList.add("project");
      let projectTitle = document.createElement("span");
      projectTitle.innerText = project.name;
      projectTitle.addEventListener("click", function() {
        manager.setActive(index);
        removeActiveProject();
        projectNode.classList.add("project-active");
        listTodos();
      });
      projectNode.appendChild(projectTitle);
      projectListNode.appendChild(projectNode);
    });
    // Show the active project
    showActiveProject();
    // Show the todos for the currently active project
    listTodos();
  }

  function clearProjects() {
    let projectListNode = document.querySelector(".projects-list");
    while (projectListNode.firstChild) {
      projectListNode.removeChild(projectListNode.firstChild);
    }
  }

  function showActiveProject() {
    let allProjects = document.querySelectorAll(".project");
    let activeIndex = manager.getActiveIndex();
    allProjects[activeIndex].classList.add("project-active");
  }

  function removeActiveProject() {
    if (document.querySelector(".project-active")) {
      document.querySelector(".project-active").classList.remove("project-active");
    }
  }

  // Todos Handling

  function newTodoBtn() {
    let todosHeader = document.querySelector(".todos-header");
    let btn = document.createElement("button");
    btn.innerText = "New";
    btn.classList.add("btn");
    btn.classList.add("todo-btn");
    btn.addEventListener("click", function() {
      // Add or remove new project form if it exists
      if (document.querySelector("#new-todo-form")) {
        document.querySelector("#new-todo-form").remove();
      }
      else {
        todosHeader.appendChild(createTodoForm());
      }
    });
    todosHeader.appendChild(btn);
  }

  function createTodoForm() {
    // Form label and input
    let form = document.createElement("form");
    form.id = "new-todo-form";
    let todoTitleLabel = document.createElement("p");
    todoTitleLabel.classList.add("todo-form-label");
    todoTitleLabel.innerText = "Title";
    let todoTitle = document.createElement("input");
    todoTitle.id = "new-todo-title";
    todoTitle.type = "text";
    let todoDescriptionLabel = document.createElement("p");
    todoDescriptionLabel.classList.add("todo-form-label");
    todoDescriptionLabel.innerText = "Description";
    let todoDescription = document.createElement("input");
    todoDescription.id = "new-todo-description";
    todoDescription.type = "text";
    let todoDateLabel = document.createElement("p");
    todoDateLabel.classList.add("todo-form-label");
    todoDateLabel.innerText = "Due Date";
    let todoDate = document.createElement("input");
    todoDate.id = "new-todo-date";
    todoDate.type = "text";
    let todoPriorityLabel = document.createElement("p");
    todoPriorityLabel.classList.add("todo-form-label");
    todoPriorityLabel.innerText = "Priority";
    let todoPriorityHigh = document.createElement("input");
    todoPriorityHigh.classList.add("new-todo-priority");
    todoPriorityHigh.id = "new-todo-priority-high";
    todoPriorityHigh.type = "radio";
    todoPriorityHigh.name = "newPriority";
    todoPriorityHigh.value = "High";
    todoPriorityHigh.checked = true;
    let todoPriorityHighText = document.createElement("span");
    todoPriorityHighText.classList.add("new-todo-priority-text");
    todoPriorityHighText.innerText = "High";
    let todoPriorityMedium = document.createElement("input");
    todoPriorityMedium.classList.add("new-todo-priority");
    todoPriorityMedium.id = "new-todo-priority-medium";
    todoPriorityMedium.type = "radio";
    todoPriorityMedium.name = "newPriority";
    todoPriorityMedium.value = "Medium";
    let todoPriorityMediumText = document.createElement("span");
    todoPriorityMediumText.classList.add("new-todo-priority-text");
    todoPriorityMediumText.innerText = "Medium";
    let todoPriorityLow = document.createElement("input");
    todoPriorityLow.classList.add("new-todo-priority");
    todoPriorityLow.id = "new-todo-priority-low";
    todoPriorityLow.type = "radio";
    todoPriorityLow.name = "newPriority";
    todoPriorityLow.value = "Low";
    let todoPriorityLowText = document.createElement("span");
    todoPriorityLowText.classList.add("new-todo-priority-text");
    todoPriorityLowText.innerText = "Low";
    let todoNotesLabel = document.createElement("p");
    todoNotesLabel.classList.add("todo-form-label");
    todoNotesLabel.innerText = "Notes (Optional)";
    let todoNotes = document.createElement("input");
    todoNotes.id = "new-todo-notes";
    todoNotes.type = "text";
    // Form submit
    let btn = document.createElement("button");
    btn.innerText = "Create";
    // Need to specify button type as button because submit is default
    btn.type = "button";
    btn.addEventListener("click", function() {
      newTodo();
    });
    btn.classList.add("btn");
    // Appending to form
    form.appendChild(todoTitleLabel);
    form.appendChild(todoTitle);
    form.appendChild(todoDescriptionLabel);
    form.appendChild(todoDescription);
    form.appendChild(todoDateLabel);
    form.appendChild(todoDate);
    form.appendChild(todoPriorityLabel);
    form.appendChild(todoPriorityHigh);
    form.appendChild(todoPriorityHighText);
    form.appendChild(todoPriorityMedium);
    form.appendChild(todoPriorityMediumText);
    form.appendChild(todoPriorityLow);
    form.appendChild(todoPriorityLowText);
    form.appendChild(todoNotesLabel);
    form.appendChild(todoNotes);
    form.appendChild(btn);

    return form;
  }

  function newTodo() {
    let filled = true;
    let todoInputs = [];
    // Index 0 is title
    todoInputs.push(document.querySelector("#new-todo-title").value);
    // Index 1 is description
    todoInputs.push(document.querySelector("#new-todo-description").value);
    // Index 2 is dueDate
    todoInputs.push(document.querySelector("#new-todo-date").value);
    // Index 3 is priority
    todoInputs.push(document.querySelector('input[name="newPriority"]:checked').value);
    // Index 4 is notes
    todoInputs.push(document.querySelector("#new-todo-notes").value);

    for (let i = 0; i < 3; i++) {
      if (isEmpty(todoInputs[i])) {
        window.alert("Missing at least one todo field!");
        filled = false;
        break;
      }
    };

    // Add default value to notes if none are present
    if (isEmpty(todoInputs[4])) {
      todoInputs[4] = "None";
    }

    if (filled) {
      manager.createTodo(todoInputs[0], todoInputs[1], todoInputs[2], 
        todoInputs[3], todoInputs[4]);
      document.querySelector("#new-todo-form").remove();
      listTodos();
    }
  }

  function listTodos() {
    let todoListNode = document.querySelector(".todos-list");
    // Clear already shown todos
    clearTodos()
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
        todoDetails(todoNode, todo, index);
      });
      todoNode.appendChild(todoTop);
      todoListNode.appendChild(todoNode);
    });
  }

  function clearTodos() {
    let todoListNode = document.querySelector(".todos-list");
    while (todoListNode.firstChild) {
      todoListNode.removeChild(todoListNode.firstChild);
    }
  }

  function todoDetails(node, todo, todoIndex) {
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
    details.appendChild(createPriorityChangeForm());

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

  function createPriorityChangeForm(todoIndex) {
    // Form label and input
    let form = document.createElement("form");
    form.id = "change-priority-form";
    let changePriorityLabel = document.createElement("p");
    changePriorityLabel.classList.add("priority-change-label");
    changePriorityLabel.innerText = "Change Priority";
    let changePriorityCompleted = document.createElement("input");
    changePriorityCompleted.classList.add("change-todo-priority");
    changePriorityCompleted.id = "change-todo-priority-completed";
    changePriorityCompleted.type = "radio";
    changePriorityCompleted.name = "changePriority";
    changePriorityCompleted.value = "Completed";
    changePriorityCompleted.checked = true;
    let changePriorityCompletedText = document.createElement("span");
    changePriorityCompletedText.classList.add("change-todo-priority-text");
    changePriorityCompletedText.innerText = "Completed";
    let changePriorityHigh = document.createElement("input");
    changePriorityHigh.classList.add("change-todo-priority");
    changePriorityHigh.id = "change-todo-priority-high";
    changePriorityHigh.type = "radio";
    changePriorityHigh.name = "changePriority";
    changePriorityHigh.value = "High";
    let changePriorityHighText = document.createElement("span");
    changePriorityHighText.classList.add("change-todo-priority-text");
    changePriorityHighText.innerText = "High";
    let changePriorityMedium = document.createElement("input");
    changePriorityMedium.classList.add("change-todo-priority");
    changePriorityMedium.id = "change-todo-priority-medium";
    changePriorityMedium.type = "radio";
    changePriorityMedium.name = "changePriority";
    changePriorityMedium.value = "Medium";
    let changePriorityMediumText = document.createElement("span");
    changePriorityMediumText.classList.add("change-todo-priority-text");
    changePriorityMediumText.innerText = "Medium";
    let changePriorityLow = document.createElement("input");
    changePriorityLow.classList.add("change-todo-priority");
    changePriorityLow.id = "change-todo-priority-low";
    changePriorityLow.type = "radio";
    changePriorityLow.name = "changePriority";
    changePriorityLow.value = "Low";
    let changePriorityLowText = document.createElement("span");
    changePriorityLowText.classList.add("change-todo-priority-text");
    changePriorityLowText.innerText = "Low";
    // Form submit
    let btn = document.createElement("button");
    btn.innerText = "Update";
    // Need to specify button type as button because submit is default
    btn.type = "button";
    btn.addEventListener("click", function() {
      // Call changeTodo
      changePriority(todoIndex);
    });
    btn.classList.add("btn");
    // Appending to form
    form.appendChild(changePriorityLabel);
    form.appendChild(changePriorityCompleted);
    form.appendChild(changePriorityCompletedText);
    form.appendChild(changePriorityHigh);
    form.appendChild(changePriorityHighText);
    form.appendChild(changePriorityMedium);
    form.appendChild(changePriorityMediumText);
    form.appendChild(changePriorityLow);
    form.appendChild(changePriorityLowText);
    form.appendChild(btn);

    return form;
  }

  function deleteTodo(index) {
    manager.removeTodo(index);
    listTodos();
  }

  function changePriority() {
    let updatedPriority = document.querySelector('input[name="changePriority"]:checked').value;
    let allTodos = document.querySelectorAll('.todo');
    for (let i = 0; i < allTodos.length; i++) {
      if (allTodos[i].childNodes.length == 2) {
        manager.changeTodoPriority(updatedPriority, i);
      }
    }
    listTodos();
  }

  function setup() {
    newProjectBtn();
    newTodoBtn();
    manager.setActive(0);
    listProjects();
    // Find first project, which is always default, and set active
    showActiveProject();
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