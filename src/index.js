import { TodoFactory } from './todo.js';
import { ProjectFactory } from './projects.js';
import { manager } from './manager.js';
import { displayHandler } from './displayHandler.js';
import css from './css/style.css';

// Disable the enter key for default form submission in form inputs
// See: https://stackoverflow.com/questions/5629805/disabling-enter-key-for-form
window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'){e.preventDefault();return false;}}},true);

document.addEventListener("DOMContentLoaded", function(event) {

  manager.addProject("Test");
  manager.setActive(1);
  let test = manager.getActive();
  test.addTodo(TodoFactory("title","desc","date","High","notes"));
  test.addTodo(TodoFactory("title2","desc2","date2","Medium","notes2"));
  displayHandler.setup();

});