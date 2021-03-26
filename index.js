const main = document.querySelector('#main');
document.querySelector('#form').addEventListener('submit', displayTodo);



function displayTodo(e) {
  e.stopPropagation();
  e.preventDefault();
  //Create a div element to house the div elements
  const taskWrap = document.createElement('div');
  
  taskWrap.className = 'display-todo-list';

  taskWrap.innerHTML = "<h3>Get this done:</h3>";

  //Append div element to the main element
  main.appendChild(taskWrap);


  //Create p Element
  const taskName = document.createElement('p');

  //Add textContent to the p element
  taskName.textContent = "Task: ";
  taskName.textContent += document.getElementById('task').value;

  //Create p Element
  const taskDuration = document.createElement('p');

  //Add textContent to the p element
  taskDuration.textContent = "taskDuration: ";
  taskDuration.textContent += document.getElementById('taskDuration').value;

  //Append p element to the taskWrap
  taskWrap.appendChild(taskName);
  taskWrap.appendChild(taskDuration);
  console.log(taskName);
  console.log(taskDuration);

  //Create deleteBtn
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute("type","button");
  deleteBtn.className = ('btn btn-danger btn-sm delete deletebtn');
  //Add textContent
  deleteBtn.textContent = "X";

  //Append btn
  taskWrap.appendChild(deleteBtn);

  document.querySelector('.btn').addEventListener('click', deleteItems);
}




function deleteItems(e) {
  console.log(1);
}
