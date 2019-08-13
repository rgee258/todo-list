import { TodoFactory } from './todo.js';
import { ProjectFactory } from './projects.js';
import { manager } from './manager.js';
import { displayHandler } from './displayHandler.js';
import css from './css/style.css';

document.addEventListener("DOMContentLoaded", function(event) {

  manager.addProject("Test");
  manager.setActive(1);
  let test = manager.getActive();
  test.addTodo(TodoFactory("title","desc","date","High","notes"));
  test.addTodo(TodoFactory("title2","desc2","date2","Medium","notes2"));
  displayHandler.setup();

});