const taskInput = document.querySelector('#task');
const durationInput = document.querySelector('#duration');
const todoList = document.querySelector('#todo-list');

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
  let todo = localStorage.getItem('todos');
  if(todo) {
    todo = JSON.parse(todo);
  }
  todo.push({task, duration}); // Todo to push to local
  todos = [...todo];
  localStorage.setItem('todos', JSON.stringify(todo));
  displayTodo(e);
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
    
    //Create checkboxBtn
    this.checkedBtn = document.createElement('button');
    this.checkedBtn.className = ('btn btn-default btn-xs checked-btn');
    this.checkedBtn.innerHTML = '<i class="fas fa-check"></i>';
    
    
    // Create delete button
    this.deleteBtn = document.createElement('button');
    this.deleteBtn.setAttribute("type","button");
    this.deleteBtn.className = ('btn btn-danger btn-xs delete deletebtn');
    this.deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
    //Add EventListener to  btn
    // this.deleteBtn.addEventListener('click', handleDeleteTodo)
    const todo = todos.some(todo => todo.task === this.taskName.value);
    if(todo) {
      this.deleteBtn.onclick = handleDeleteTodo;
    }
  }
}

const displayNoTodoMessage = (e) => {
  const p = document.createElement('p');
  if(e.target.id === 'uncompleted' || e.target.id === 'completed') {
    if(!todos.length) {
      p.textContent = `No task to perform. Input a task.`;
      p.style.margin = '10px';
      document.querySelector('#todo-list').append(p);
    }else {
      p.textContent = `Tick completed task.`;
      p.style.margin = '10px';
      document.querySelector('#todo-list').append(p);
    }
  }
}

const displayTodo = (e) => {
  const myTodo = new todoObj();
  const { task, duration} = myTodo;
  todos.forEach(todo => {
    const htmlElem = new HTMLElements();
    const {
      taskWrap,
      taskName,
      taskDuration,
      deleteBtn,
      checkedBtn
    } = htmlElem;

    taskWrap.append(taskName, checkedBtn, deleteBtn);
    taskName.textContent = `${todo.task} for ${todo.duration}`;
    document.querySelector('#todo-list').append(taskWrap);
  })
  displayCompleted();
  displayUncompleted();
}


const handleDeleteTodo = (e) => {
  e.preventDefault();
  if(e.target === document.querySelector('.btn-danger')) {
    const del = e.target.parentNode;
    const taskName = del.querySelector('p:first-of-type');
    console.log('Task', taskName);
    let todo = localStorage.getItem('todos');
    todo = JSON.parse(todo);
    //Delete from local storage
    // for(let i = 0; i < todo.length; i++) {
    //   todo.splice(i, 1);
    // }
    todo = todo.filter(todo => todos.task !== taskName)
    todos = [...todo];
    // Reset Local Storage
    localStorage.setItem('todos', JSON.stringify(todo));
    // Delete from DOM
    document.querySelector('#todo-list').removeChild(del);
  }
}

const displayCompleted = () => {
  const completedBtn = document.querySelector('#completed');
  completedBtn.addEventListener('click', (e) => {
    e.preventDefault();
    todoList.innerHTML = '';
    displayNoTodoMessage(e);
    if(document.querySelector('input[type="checkbox"]').checked) {
      const h4Elem = document.createElement('h4');
      const taskWrap = document.querySelector('.task-wrap');
      todoList.append(h4Elem, taskWrap);
      console.log("Completed Task", todoList);
    }
  })
}

const displayUncompleted = () => {
  const uncompletedBtn = document.querySelector('#uncompleted');
  uncompletedBtn.addEventListener('click', (e) => {
    e.preventDefault();
    todoList.innerHTML = '';
    displayNoTodoMessage(e);
    const h4Elem = document.createElement('h4');
    if(!document.querySelector('input[type="checkbox"]').checked) {
      h4Elem.textContent = 'Uncompleted Task';
      const taskWrap = document.querySelector('.task-wrap');
      todoList.append(h4Elem, taskWrap);
      console.log("Uncompleted Task", todoList);
    }
  })
}

window.addEventListener('load', displayTodo);
taskInput.addEventListener('click', clearInput);
durationInput.addEventListener('click', clearInput);
document.querySelector('#form').addEventListener('submit', handleAddToLocalStorage);
