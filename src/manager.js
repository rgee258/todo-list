import { TodoFactory } from './todo.js';
import { ProjectFactory } from './projects.js';

const manager = (() => {

  let projectList = [];
  projectList.push(ProjectFactory("Default"));
  let active = projectList[0];

  function getActive() {
    return active;
  }

  function setActive(projectNum) {
    active = projectList[projectNum];
  }

  function addProject(projectName) {
    projectList.push(ProjectFactory(projectName));
  }

  function createTodo(title, description, dueDate, priority, notes) {
    let todo = TodoFactory(title, description, dueDate, priority, notes);
    active.addTodo(todo);
  }

  const getProjects = () => projectList;

  const getActiveTodos = () => active.getTodoList();

  return { getActive, setActive, addProject, createTodo, getProjects, 
    getActiveTodos };

})();

export {
  manager
}