const ProjectFactory = (name, id) => {

  // They seem instanced, are variables defined already bound
  // to this instance?
  let todoList = [];

  function setName(newName) {
    this.name = newName;
  }

  function addTodo(todo) { 
    todoList.push(todo);
  }

  function deleteTodo(index) {
    if (todoList.length == 1) {
      todoList.pop();
    }
    else {
      let left = todoList.slice(0, index);
      let right = todoList.slice(index + 1, todoList.length + 1);
      todoList = left.concat(right);
    }
  }

  function updateTodoPriority(newPriority, index) {
    todoList[index].setPriority(newPriority);
  }

  function setTodoList(newList) {
    todoList = newList;
  }

  const getTodoList = () => todoList;

  return { name, id, setName, getTodoList, setTodoList, addTodo, deleteTodo, 
    updateTodoPriority }
}

export {
  ProjectFactory
}