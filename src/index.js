import { displayHandler } from './displayHandler.js';
import css from './css/style.css';

// Disable the enter key for default form submission in form inputs
// See: https://stackoverflow.com/questions/5629805/disabling-enter-key-for-form
window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'){e.preventDefault();return false;}}},true);

document.addEventListener("DOMContentLoaded", function(event) {
  displayHandler.setup();
});