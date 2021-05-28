// Variables
const taskInput = document.querySelector('#task');
const durationInput = document.querySelector('#duration');
const todoList = document.querySelector('#todo-list');
const allBtn = document.querySelector('#all');
const completedBtn = document.querySelector('#completed');
const unCompletedBtn = document.querySelector('#uncompleted');

// Global todos: A copy of our local storage data
let todos = localStorage.getItem('todos');
if(todos) {
  todos = JSON.parse(todos);
}else {
  todos = [];
  localStorage.setItem('todos', JSON.stringify([]));
}

// Clears Input
const clearInput = (e) => {
  e.preventDefault();
  document.querySelector(`#${e.target.id}`).value = '';
}

class todoObj{
  constructor() {
    this.task = document.querySelector('#task').value;
    this.duration = document.querySelector('#duration').value;
    this.id = Date.now();
  }
}

// Add to localStorage
const handleAddToLocalStorage = (e) =>  {
  e.stopPropagation();
  e.preventDefault();
  const myTodo = new todoObj();
  const { task, duration, id} = myTodo;
  let todo = localStorage.getItem('todos');
  if(todo) {
    todo = JSON.parse(todo);
  }
  todo.push({task, duration, id}); // Todo to push to local      
  todos = [...todo];
  localStorage.setItem('todos', JSON.stringify(todo));
  displayTodo(todos);
}

// Creates HTML Elements
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
    this.checkedBtn.onclick = handleTickEvents;

    // Create delete button
    this.deleteBtn = document.createElement('button');
    this.deleteBtn.setAttribute("type","button");
    this.deleteBtn.className = ('btn btn-danger btn-xs delete deletebtn');
    this.deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
    //Add EventListener to  btn
    this.deleteBtn.onclick = handleDeleteTodo;
  }
}

// Display message if no list is available
const displayNoTodoMessage = (e) => {
  const p = document.createElement('p');
  if(e.target.id === 'uncompleted' || e.target.id === 'completed') {
    if(!todos.length) {
      p.textContent = `No task to perform. Input a task.`;
      p.style.margin = '10px';
      document.querySelector('#todo-list').append(p);
    } else {
      p.textContent = `Tick completed task.`;
      p.style.margin = '10px';
      document.querySelector('#todo-list').append(p);
    }
  }
}

// Display Todo
const displayTodo = (todosArr) => {
  todoList.innerHTML = '';
  const myTodo = new todoObj();
  const { task, duration, id } = myTodo;
  todosArr.forEach(todo => {
    const htmlElem = new HTMLElements();
    const {
      taskWrap,
      taskName,
      deleteBtn,
      checkedBtn
    } = htmlElem;

    deleteBtn.setAttribute('data-id', todo.id);
    checkedBtn.setAttribute('data-id', todo.id);
    taskWrap.append(taskName, checkedBtn, deleteBtn);
    taskName.textContent = `${todo.task} for ${todo.duration}`;
    if(todo.completed === true) {
      taskName.className = 'completed';
    }else {
      taskName.classList.remove('completed');
    }
    document.querySelector('#todo-list').append(taskWrap);
  })
}

const handleDeleteTodo = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const deleteItem = e.currentTarget.dataset.id;
  let todo = localStorage.getItem('todos');
  todo = JSON.parse(todo);

  //Delete from local storage
  todo = todo.filter(todo => todo.id !== Number(deleteItem));
  todos = [...todo];

  // Reset Local Storage
  localStorage.setItem('todos', JSON.stringify(todo));

  // Delete from DOM
  displayTodo(todos);
}

const toggleTick = (e) => {
  e.currentTarget.onclick = (e.currentTarget.onclick === handleUntickEvents ?
    handleTickEvents : handleUntickEvents);
  e.target.style.color = (e.target.style.color === 'blue' ? 'white' : 'blue');
}

const handleTickEvents = (e) => {
  e.preventDefault();
  e.stopPropagation();
  let todo = localStorage.getItem('todos');
  if(todo) {
    todo = JSON.parse(todo);
  }
  todo.forEach(todoObj => {
    if(todoObj.id === Number(e.currentTarget.dataset.id))  {
      todoObj['completed'] = true;
    } 
  });  
  todos = [...todo];
  
  // Reset local storage
  localStorage.setItem('todos', JSON.stringify(todo));
  toggleTick(e);
}

const handleUntickEvents = (e) => {
  e.preventDefault();
  // e.stopPropagation();
  let todo = localStorage.getItem('todos');
  if(todo) {
    todo = JSON.parse(todo);
  }
  todo.forEach(todoObj => {
    if(todoObj.id === Number(e.currentTarget.dataset.id))  {
      delete todoObj.completed;
    } 
  });  

  todos = [...todo];
  // Reset local storage
  localStorage.setItem('todos', JSON.stringify(todo));
  toggleTick(e);
  displayTodo(todos);
}

const filterTodos = (e) => {
  e.preventDefault();
  todoList.innerHTML = '';
  let filteredTodos;
  switch(e.target.id) {
    case 'completed':
      filteredTodos = todos.filter(todosObj => todosObj.completed === true);
      if(filteredTodos.length){
        displayTodo(filteredTodos);
      }else {
        displayNoTodoMessage(e); 
      }
      break;
    case 'uncompleted': 
      filteredTodos = todos.filter(todosObj => !todosObj.completed);
      if(!filteredTodos.length) {
        displayNoTodoMessage(e); 
      }else {
        displayTodo(filteredTodos);
      }
      break;
    case 'all':      
      displayTodo(todos);
      break;  
  } 
}

const displayUnCompletedTask = (e) => {
  filterTodos(e); 
}

const displayCompletedTask = (e) => {
  filterTodos(e);
}

const displayAllTask = (e) => {
  filterTodos(e);
  displayTodo(todos);
}



displayTodo(todos);
// Add Event Listener
taskInput.addEventListener('click', clearInput);
durationInput.addEventListener('click', clearInput);
allBtn.addEventListener('click', displayAllTask);
completedBtn.addEventListener('click', displayCompletedTask);
unCompletedBtn.addEventListener('click', displayUnCompletedTask);
document.querySelector('#form').addEventListener('submit', handleAddToLocalStorage);
