document.querySelector('#form').addEventListener('submit', displayTodo);

let todos = localStorage.getItem('todos');
if(todos) {
  todos = JSON.parse(todos);
}else {
  todos = [];
  localStorage.setItem('todos', JSON.stringify([]));
}

function displayTodo(e) {
  e.stopPropagation();
  e.preventDefault();
  //Create a div element to house the div elements
  const taskWrap = document.createElement('div');  
  taskWrap.className = 'task-wrap';


  //Create p Element
  const taskName = document.createElement('p');
  //Add textContent to the p element
  taskName.textContent = "Task: " + document.getElementById('task').value; 
  taskWrap.appendChild(taskName);
  
  //Create p Element
  const taskDuration = document.createElement('p');
  //Add textContent to the p element
  taskDuration.textContent = "Duration: " +  document.getElementById('duration').value;
  taskWrap.appendChild(taskDuration);

  //Create Btn
  // Create bookmark button
  const bookmarkBtn = document.createElement('button');
  bookmarkBtn.setAttribute("type","button");
  bookmarkBtn.className = 'btn btn-xs btn-default bookmark-btn';
  bookmarkBtn.innerHTML = `<i class="far fa-bookmark"></i>`;
  
  // Create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute("type","button");
  deleteBtn.className = ('btn btn-danger btn-sm delete deletebtn');
  deleteBtn.textContent = "X";
  //Add EventListener to  btn
  deleteBtn.addEventListener('click', deleteItems);
  bookmarkBtn.addEventListener('click', addToLocalStorage);
  //Append btn
  // taskWrap.appendChild(bookmarkBtn, deleteBtn);
  addToLocalStorage();
  // document.querySelector('.bookmark__list').appendChild(taskWrap);

}



function deleteItems(e) {
  if(e.target.classList.contains('delete')) {
    const del = e.target.parentNode;
    document.querySelector('#todo-list').removeChild(del)
  }
  // e.target.parentNode.remove();
  console.log(e.target.parentNode);
}

class todoObj{
  constructor() {
    this.task = document.querySelector('#task').value;
    this.duration = document.querySelector('#duration').value;
  }
}

// Add to localStorage
function addToLocalStorage() {
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

