const main = document.querySelector('#main')
document.querySelector('#form').addEventListener('submit', displayTodo);



function displayTodo(e) {
  e.stopPropagation();
  e.preventDefault();

  //Create a div element to house the p elements
  const displayBox = document.createElement('div');
  displayBox.id = 'display-todo-list';

  displayBox.innerHTML = "<h3>Get this done:</h3>"

  //Append div element to the main element
  main.appendChild(displayBox)


  //Create p Element
  const task = document.createElement('p');

  //Add textContent to the p element
  task.textContent = "Task: "
  task.textContent += document.getElementById('task').value;

  //Create p Element
  const duration = document.createElement('p');

  //Add textContent to the p element
  duration.textContent = "Duration: "
  duration.textContent += document.getElementById('duration').value;

  //Append p element to the displaybox
  displayBox.appendChild(task);
  displayBox.appendChild(duration);
  console.log(task);
  console.log(duration);

}