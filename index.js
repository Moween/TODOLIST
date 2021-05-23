document.querySelector('#form').addEventListener('submit', addToLocalStorage);

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
function addToLocalStorage() {
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
}

class createElements {
  constructor() {
    //Create a div element to house the div elements
    this.taskWrap = document.createElement('div');  
    this.taskWrap.className = 'task-wrap';


    //Create p Element
    const taskName = document.createElement('p');
    //Add textContent to the p element
    taskName.textContent = "Task: " + document.getElementById('task').value; 
    this.taskWrap.appendChild(taskName);
    

    //Create Btn
    // Create bookmark button
    const checkbox = document.createElement('input');
    checkbox.setAttribute("type","checkbox");
    checkbox.setAttribute("id","taskWrap");
    checkbox.setAttribute("value","todo");
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute("type","button");
    deleteBtn.className = ('btn btn-danger btn-sm delete deletebtn');
    deleteBtn.textContent = "X";
    //Add EventListener to  btn
    deleteBtn.addEventListener('click', deleteItems);

    document.querySelector('.bookmark__list').appendChild(taskWrap);
  }

}



function deleteItems(e) {
  if(e.target.classList.contains('delete')) {
    const del = e.target.parentNode;
    document.querySelector('#todo-list').removeChild(del)
  }
  // e.target.parentNode.remove();
  console.log(e.target.parentNode);
}