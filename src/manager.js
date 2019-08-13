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
    // Find submission box and retrieve text for projectName
    // OR just do that via displayHandler and add an argument here?
    projectList.push(ProjectFactory(projectName));
  }

  const getProjects = () => projectList;

  const getActiveTodos = () => active.getTodoList();

  return { getActive, setActive, addProject, getProjects, 
    getActiveTodos };

})();

export {
  manager
}