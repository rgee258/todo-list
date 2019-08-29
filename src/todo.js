import { format } from 'date-fns';

const TodoFactory = (title, description, dueDate, priority, notes, projectId) => {

  // Use the HTML date input and parse it to make a proper date object
  // Slice call is for parsing the stringified date from localStorage
  let oldDate = dueDate.slice(0, 10).split("-");
  oldDate.forEach(function(str) {
    str = parseInt(str);
  });
  // For some reason the month gets increased by one when creating a new Date?
  // Circumvented by subtracting one even though the array values are correct
  dueDate = new Date(oldDate[0], oldDate[1] - 1, oldDate[2]);

  function formattedDueDate() {
    let formatted = format(dueDate, 'L/d/y');
    return formatted;
  }

  function setPriority(newPriority) {
    switch (newPriority) {
      case 'High':
      case 'Medium':
      case 'Low':
      case 'Completed':
        this.priority = newPriority;
        break;
      default:
        this.priority = "ERROR";
    }
  }
  
  return { title, description, dueDate, priority, notes, projectId, formattedDueDate, setPriority };
}

export {
  TodoFactory
}