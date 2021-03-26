document.querySelector('#form').addEventListener('submit', displayTodo);


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

  //Create deleteBtn
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute("type","button");
  deleteBtn.className = ('btn btn-danger btn-sm delete deletebtn');
  deleteBtn.textContent = "X";
  //Add EventListener to delete btn
  deleteBtn.addEventListener('click', deleteItems);
  //Append btn
  taskWrap.appendChild(deleteBtn);

  document.querySelector('#todo-list').appendChild(taskWrap);

}



function deleteItems(e) {
  if(e.target.classList.contains('delete')) {
    const del = e.target.parentNode;
    document.querySelector('#todo-list').removeChild(del)
  }
  // e.target.parentNode.remove();
  console.log(e.target.parentNode);
}
