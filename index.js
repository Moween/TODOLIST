
document.querySelector('#form').addEventListener('submit', displayTodo);

const displayBox = document.querySelector('#display-todo-list');
displayBox.classList.add('invisible');


function displayTodo(e) {
  e.stopPropagation();
  e.preventDefault();
  displayBox.classList.remove('invisible');
  const task = document.createElement('p');
  task.textContent = document.getElementById('task').value;
  const duration = document.createElement('p');
  duration.textContent = document.getElementById('duration').value;
  displayBox.appendChild(task);
  displayBox.appendChild(duration);
  displayBox.appendChild(document.createElement('hr'));

}