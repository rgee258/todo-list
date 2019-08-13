const TodoFactory = (title, description, dueDate, priority, notes) => {

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
  
  return { title, description, dueDate, priority, notes, setPriority };
}

export {
  TodoFactory
}