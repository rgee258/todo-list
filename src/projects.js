const ProjectFactory = (name) => {

  // They seem instanced, are variables defined already bound
  // to this instance?
  let todoList = [];

  function setName(newName) {
    this.name = newName;
  }

  function addTodo(todo) { 
    todoList.push(todo);
  }

  const getTodoList = () => todoList;

  return { name, setName, getTodoList, addTodo }
}

export {
  ProjectFactory
}