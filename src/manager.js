import { TodoFactory } from './todo.js';
import { ProjectFactory } from './projects.js';
import { isDate, compareAsc } from 'date-fns';

const manager = (() => {

  let projectList = [];
  projectList.push(ProjectFactory("Default", 0));
  let active = projectList[0];

  function getActive() {
    return active;
  }

  function getActiveIndex() {
    for (let i = 0; i < projectList.length; i++) {
      if (active == projectList[i]) {
        return i;
      }
    }
  }

  function setActive(projectId) {
    for (let i = 0; i < projectList.length; i++ ) {
      if (projectList[i].id == projectId) {
        active = projectList[i];
      }
    }
  }

  function addProject(projectName) {
    let highestId = 0;
    // Make sure id's don't repeat by making a new one
    // higher than the maximum id value
    projectList.forEach(function(project) {
      if (project.id > highestId) {
        highestId = project.id;
      }
    });
    projectList.push(ProjectFactory(projectName, highestId + 1));
    saveStorage();
  }

  function removeProject(id) {
    // Reset the active project if it is deleted
    if (id == active.id) {
      setActive(0);
    }

    if (projectList.length == 2) {
      projectList.pop();
    }
    else {
      // Get index of the project with said id
      let index;
      for (let i = 0; i < projectList.length; i++) {
        if (id == projectList[i].id) {
          index = i;
          break;
        }
      }
      let left = projectList.slice(0, index);
      let right = projectList.slice(index + 1, projectList.length + 1);
      projectList = left.concat(right);
    }
    saveStorage();
  }

  function createTodo(title, description, dueDate, priority, notes) {
    let todo = TodoFactory(title, description, dueDate, priority, notes, active.id);
    active.addTodo(todo);
    sortTodos();
    saveStorage();
  }

  function removeTodo(index) {
    active.deleteTodo(index);
    saveStorage();
  }

  function changeTodoPriority(newPriority, index) {
    active.updateTodoPriority(newPriority, index);
  }

  function sortTodos() {
    active.setTodoList(active.getTodoList().sort(compareTodos));
  }

  // Comparison function which can access the dueDate properties
  // Of arbitrary todos a and b, which passes said values to
  // the compareAsc function from date-fns
  function compareTodos(a, b) {
    return compareAsc(a.dueDate, b.dueDate);
  }

  const getProjects = () => projectList;

  const getActiveTodos = () => active.getTodoList();

  // localStorage methods

  // Check if storage is available
  // See: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
  }

  function saveStorage() {
    if (storageAvailable('localStorage')) {
      // Save the projects
      localStorage.setItem('storedProjects', JSON.stringify(projectList));
      let allTodos = [];
      projectList.forEach(function(project) {
        // Loop through each project's todoList
        // Push each one to allTodos
        let projectTodos = project.getTodoList();
        projectTodos.forEach(function(todo) {
          allTodos.push(todo);
        });
      });
      // Save the todos
      localStorage.setItem('storedTodos', JSON.stringify(allTodos));
    }
  }

  function loadStorage() {
    // REMEMBER: You cannot save functions in objects, only data
    if (storageAvailable('localStorage') && localStorage.length > 0) {
      projectList = [];
      let savedProjects = JSON.parse(localStorage.getItem('storedProjects'));
      // Take out the string values of each project and use them to create them as
      // project objects once again
      // Add every stored project to the projectList
      savedProjects.forEach(function(project) {
        projectList.push(ProjectFactory(project.name, project.id));
      });
      let savedTodos = JSON.parse(localStorage.getItem('storedTodos'));
      // Take out the string values of todos and create them again like projects
      // Loop through each todo, then loop through all projects for a matching id
      // Add the todo to the corresponding project's todoList
      savedTodos.forEach(function(todo) {
        for (let i = 0; i < projectList.length; i++) {
          if (todo.projectId == projectList[i].id) {
            let loadTodo = TodoFactory(todo.title, todo.description, todo.dueDate,
              todo.priority, todo.notes, todo.projectId);
            projectList[i].addTodo(loadTodo);
          }
        }
      });
    }
  }

  return { getActive, getActiveIndex, setActive, addProject, removeProject, createTodo, 
    removeTodo, changeTodoPriority, getProjects, getActiveTodos, loadStorage };

})();

export {
  manager
}