import { TodoFactory } from './todo.js';
import { ProjectFactory } from './projects.js';

const manager = (() => {

  let projectList = [];
  projectList.push(ProjectFactory("Default"));
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

  function setActive(projectIndex) {
    active = projectList[projectIndex];
  }

  function addProject(projectName) {
    projectList.push(ProjectFactory(projectName));
  }

  function createTodo(title, description, dueDate, priority, notes) {
    let todo = TodoFactory(title, description, dueDate, priority, notes);
    active.addTodo(todo);
  }

  function removeTodo(index) {
    active.deleteTodo(index);
  }

  function changeTodoPriority(newPriority, index) {
    // What parameters do we need?
    active.updateTodoPriority(newPriority, index);
  }

  const getProjects = () => projectList;

  const getActiveTodos = () => active.getTodoList();

  return { getActive, getActiveIndex, setActive, addProject, createTodo, removeTodo,
    changeTodoPriority, getProjects, getActiveTodos };

})();

export {
  manager
}