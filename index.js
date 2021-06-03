// Variables
const taskInput = document.querySelector('#task');
const durationInput = document.querySelector('#duration');
const todoList = document.querySelector('#todo-list');
const allBtn = document.querySelector('#all');
const completedBtn = document.querySelector('#completed');
const unCompletedBtn = document.querySelector('#uncompleted');

// Global todos: A copy of our local storage data
let todosCopy = localStorage.getItem('todos');
if(todosCopy) {
  todosCopy = JSON.parse(todosCopy);
}else {
  todosCopy = [];
  //Set local storage key to (todos)
  localStorage.setItem('todos', JSON.stringify([]));
}

// Clears Input
const clearInput = (e) => {
  e.preventDefault();
  document.querySelector(`#${e.target.id}`).value = '';
}

class ToDo {
  constructor(newTodo) {
    this.task = newTodo.task;
    this.duration = newTodo.duration;
    this.id = newTodo.id;
    this.completed = false;
  }
}

// Add to localStorage
const AddTodos = (e) =>  {
  e.preventDefault();
  e.stopPropagation();
  // created an empty Object
  let newTodo = {};
  // Assigned key value pairs to the object
  newTodo.task = e.target['task'].value;
  newTodo.duration = e.target['duration'].value;
  newTodo.id = Date.now().toString();

  // Instantiated a todo object
  const myTodo = new ToDo(newTodo);
  // Get 'todos arr' from local storage
  let todos = localStorage.getItem('todos');
  todos = JSON.parse(todos);
  // Todo to push to local storage
  todos.push({ task, duration, id, completed } = myTodo); 
  // Update the global todosArr (todosCopy)whuch is a copy of local storage data
  todosCopy = [...todos];
  // Rest local storage
  localStorage.setItem('todos', JSON.stringify(todos));
  displayTodo(todosCopy);
}

// Creates HTML Elements
class CreateTodo {
  constructor(todo) {
    //Create a div element to house the task, duration, button elements
    this.taskWrap = document.createElement('div');  
    this.taskWrap.className = 'task-wrap';
  
    //Create p Element
    const taskName = document.createElement('p');
    //Add textContent to the p element
    taskName.textContent = `${todo.task} for ${todo.duration}`;
    if(todo.completed === true) {
      taskName.className = 'completed';
    }else {
      taskName.classList.remove('completed');
    }
    
    //Create checkboxBtn
    const checkedBtn = document.createElement('button');
    checkedBtn.className = ('btn btn-default btn-xs checked-btn');
    checkedBtn.innerHTML = '<i class="fas fa-check"></i>';
    checkedBtn.setAttribute('data-id', todo.id);
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute("type","button");
    deleteBtn.className = ('btn btn-danger btn-xs delete deletebtn');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
    deleteBtn.setAttribute('data-id', todo.id);
    
    this.handleTickEvents = this.handleTickEvents.bind(this);
    // this.handleUntickEvents = this.handleUntickEvents.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    
    // Add EventListener to  btn
    deleteBtn.onclick = this.handleDeleteTodo;
    checkedBtn.onclick = this.handleTickEvents;
    
    this.taskWrap.append(taskName, checkedBtn, deleteBtn);
  }

  handleTickEvents = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let todos = localStorage.getItem('todos');
    todos = JSON.parse(todos);
    todos = todos.map(todo => {
      if(todo.id === e.currentTarget.dataset.id)  {
        if(!todo.completed) {
          todo.completed = true;
        }else if(todo.completed) {
          todo.completed = false;
        }
      }
      return todo;
    });  
    todosCopy = [...todos];
    
    // Reset local storage
    localStorage.setItem('todos', JSON.stringify(todos));
    // toggleTick(e);
    displayTodo(todosCopy);
  }

  // handleUntickEvents = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   let todos = localStorage.getItem('todos');
  //   if(todos) {
  //     todos = JSON.parse(todos);
  //   }
  //   todos = todos.map(todo => {
  //     if(todo.id === e.currentTarget.dataset.id)  {
  //       todo.completed = false;
  //     }
  //     return todo;
  //   });  
  
  //   todosCopy = [...todos];
  //   // Reset local storage
  //   localStorage.setItem('todos', JSON.stringify(todos));
  //   toggleTick(e);
  // }

  handleDeleteTodo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { currentTarget: { dataset: { id: deleteItem } } } = e;
    let todos = localStorage.getItem('todos');
    todos = JSON.parse(todos);
  
    //Delete from local storage
    todos = todos.filter(todo => todo.id !== deleteItem);
    todosCopy = [...todos];
  
    // Reset Local Storage
    localStorage.setItem('todos', JSON.stringify(todos));
  
    // Delete from DOM
    displayTodo(todosCopy);
  }
}

// Display message if no list is available
const displayNoTodoMessage = (e) => {
  const p = document.createElement('p');
  if(e.target.id === 'uncompleted' || e.target.id === 'completed') {
    if(!todosCopy.length) {
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
  todosArr.forEach(todo => {
    const { taskWrap } = new CreateTodo(todo);   
    document.querySelector('#todo-list').append(taskWrap);
  })
}

// const toggleTick = (e) => {
//   const { handleTickEvents, handleUntickEvents } = new CreateTodo();
//   e.currentTarget.onclick = (e.currentTarget.onclick === handleUntickEvents ?
//     handleTickEvents : handleUntickEvents);
//   e.target.style.color = (e.target.style.color === 'blue' ? 'white' : 'blue');
// }

const filterTodos = (e) => {
  e.preventDefault();
  todoList.innerHTML = '';
  let filteredTodos;
  switch(e.target.id) {
    case 'all':      
      displayTodo(todosCopy);
      break;
    case 'completed':
      filteredTodos = todosCopy.filter(todosObj => todosObj.completed === true);
      if(filteredTodos.length) {
        displayTodo(filteredTodos);
        todoList.insertAdjacentText('afterbegin', 'Completed task');
      }else {
        displayNoTodoMessage(e); 
      }
      break;
    case 'uncompleted': 
      filteredTodos = todosCopy.filter(todosObj => !todosObj.completed);
      if(!filteredTodos.length) {
        displayNoTodoMessage(e); 
      }else {
        displayTodo(filteredTodos);
        todoList.insertAdjacentText('afterbegin', 'Uncompleted task');
      }
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
}


displayTodo(todosCopy);
// Add Event Listener
taskInput.addEventListener('click', clearInput);
durationInput.addEventListener('click', clearInput);
allBtn.addEventListener('click', displayAllTask);
completedBtn.addEventListener('click', displayCompletedTask);
unCompletedBtn.addEventListener('click', displayUnCompletedTask);
document.querySelector('#form').addEventListener('submit', AddTodos);
