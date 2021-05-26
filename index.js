const taskInput = document.querySelector('#task');
const durationInput = document.querySelector('#duration');

let todos = localStorage.getItem('todos');
if(todos) {
  todos = JSON.parse(todos);
}else {
  todos = [];
  localStorage.setItem('todos', JSON.stringify([]));
}

const clearInput = (e) => {
  e.preventDefault();
  document.querySelector(`#${e.target.id}`).value = '';
}

class todoObj{
  constructor() {
    this.task = document.querySelector('#task').value;
    this.duration = document.querySelector('#duration').value;
  }
}

// Add to localStorage
const handleAddToLocalStorage = (e) =>  {
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
    // this.deleteBtn.addEventListener('click', handleDeleteTodo)
    const todo = todos.some(todo => todo.task !== this.taskName.value);
    if(todo) {
      this.deleteBtn.onclick = handleDeleteTodo;
    }
  }
}

const displayTodo = () => {
  const myTodo = new todoObj();
  const { task, duration} = myTodo;
  const allBtn = document.querySelector('#all');
  allBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#todo-list').innerHTML = '';
    if(!todos.length) {
      const p = document.createElement('p');
      p.textContent = `No task to perform. Input a task.`;
      document.querySelector('#todo-list').append(p);
    }
    
    todos.forEach(todo => {
      const htmlElem = new HTMLElements();
      const {
        taskWrap,
        taskName,
        taskDuration,
        deleteBtn,
        checkbox
      } = htmlElem;

      taskWrap.append(taskName, taskDuration, checkbox, deleteBtn);
      taskName.textContent = `Task: ${todo.task}`;
      taskDuration.textContent = `Duration: ${todo.duration}`;
      document.querySelector('#todo-list').append(taskWrap);
    });
  })
}


const handleDeleteTodo = (e) => {
  e.preventDefault();
  if(e.target === document.querySelector('.btn-danger')) {
    const del = e.target.parentNode;
    const taskName = del.querySelector('p:first-of-type');
    let todo = localStorage.getItem('todos');
    todo = JSON.parse(todo);
    //Delete from local storage
    todo = todo.filter(todo => todo.task === taskName);
    todos = [...todo];
    // Reset Local Storage
    localStorage.setItem('todos', JSON.stringify(todo));
    // Delete from DOM
    // document.querySelector('#todo-list').removeChild(del);
  }
}

window.addEventListener('load', displayTodo);
taskInput.addEventListener('click', clearInput);
durationInput.addEventListener('click', clearInput);
document.querySelector('#form').addEventListener('submit', handleAddToLocalStorage);
