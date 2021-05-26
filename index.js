
let todos = localStorage.getItem('todos');
if(todos) {
  todos = JSON.parse(todos);
}else {
  todos = [];
  localStorage.setItem('todos', JSON.stringify([]));
}

class todoObj{
  constructor() {
    this.task = document.querySelector('#task').value;
    this.duration = document.querySelector('#duration').value;
  }
}

// Add to localStorage
const addToLocalStorage = (e) =>  {
  e.stopPropagation();
  e.preventDefault();
  const myTodo = new todoObj();
  const { task, duration} = myTodo;
  console.log(task);
  console.log(duration);
  let todo = localStorage.getItem('todos');
  if(todo) {
    todo = JSON.parse(todo);
  }
  todo.push({task, duration}); // Todo to push to local
  todos = [...todo];
  localStorage.setItem('todos', JSON.stringify(todo));
  displayTodo();
}

class HTMLElements {
  constructor() {
    //Create a div element to house the div elements
    this.taskWrap = document.createElement('div');  
    this.taskWrap.className = 'task-wrap';

    //Create p Element
    this.taskName = document.createElement('p');
    //Add textContent to the p element
    this.taskName.textContent = "Task: " + document.getElementById('task').value; 

    //Create p Element
    this.taskDuration = document.createElement('p');
    //Add textContent to the p element
    this.taskDuration.textContent = "Task: " + document.getElementById('duration').value; 
    
    //Create checkbox
    this.checkbox = document.createElement('input');
    this.checkbox.setAttribute("type","checkbox");
    this.checkbox.setAttribute("id","taskWrap");
    this.checkbox.setAttribute("value","todo");
    
    // Create delete button
    this.deleteBtn = document.createElement('button');
    this.deleteBtn.setAttribute("type","button");
    this.deleteBtn.className = ('btn btn-danger btn-sm delete deletebtn');
    this.deleteBtn.textContent = "X";
    //Add EventListener to  btn
    this.deleteBtn.addEventListener('click', deleteTodo);
  }
}

const displayTodo = () => {
  const myTodo = new todoObj();
  const { task, duration} = myTodo;
  const allBtn = document.querySelector('#all');
  allBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const htmlElem = new HTMLElements();
    const {
      taskWrap,
      taskName,
      taskDuration,
      deleteBtn,
      checkbox
    } = htmlElem;
  
    taskWrap.append(taskName, taskDuration, checkbox, deleteBtn);
      console.log(taskWrap)
    todos.forEach(todo => {
      taskName.textContent = `Task: ${todo.task}`;
      taskDuration.textContent = `Duration: ${todo.duration}`;
      document.querySelector('#todo-list').append(taskWrap);
    });
  })
}



const deleteTodo = (e) => {
  if(e.target.classList.contains('delete')) {
    const del = e.target.parentNode;
    document.querySelector('#todo-list').removeChild(del);
  }
  // e.target.parentNode.remove();
  console.log(e.target.parentNode);
}

document.querySelector('#form').addEventListener('submit', addToLocalStorage);
