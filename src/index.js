import './style.css';
import ToDoList from './todo.js';

const todo = new ToDoList();

function displayTasks() {
  const fragment = document.createDocumentFragment();
  todo.storage
    .sort((a, b) => (a.index - b.index))
    .forEach((task) => {
      const listItem = document.createElement('li');
      listItem.classList.add('task');
      listItem.innerHTML = `
        
            <input class='internal-checkbox' type="checkbox" type="checkbox">
            <span class='internal-text'>${task.description}</span>
            <span class="icon-move">
                <i class="icon fas fa-ellipsis-v"></i>
            </span>
        `;
      fragment.append(listItem);
    });
  return fragment;
}

const tasksWrapper = document.querySelector('.list-wrapper');
tasksWrapper.append(displayTasks());
