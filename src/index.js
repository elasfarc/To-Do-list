import './style.css';
import ToDoList from './todo.js';

import { closestElementToCurrentDrag, domAfterReorder } from './domHelpers.js';

const todo = new ToDoList();
const tasksWrapper = document.querySelector('.list-wrapper');

function displayTasks() {
  const fragment = document.createDocumentFragment();

  todo.storage
    .forEach((task) => {
      const listItem = document.createElement('li');
      listItem.classList.add('task');
      listItem.setAttribute('draggable', 'true');
      listItem.id = task.index;
      listItem.innerHTML = `
            <input class='task-status' type="checkbox" ${(task.completed) ? 'checked' : null}>
            <span class='internal-text'>${task.description}</span>
            <span class="icon-move">
                <i class="icon fas fa-ellipsis-v"></i>
            </span>
        `;
      fragment.append(listItem);
    });
  return fragment;
}

tasksWrapper.append(displayTasks());

// event listeners  -> task status update
document.querySelectorAll('.task-status')
  .forEach((element) => {
    element.addEventListener('change', (event) => {
      const index = event.target.parentElement.id;
      todo.statusUpdate(index);
    });
  });

// event listeners  -> drag/drop
// elements (tasks) to be dragged

document.querySelectorAll('.task')
  .forEach((task) => {
    task.addEventListener('dragstart', () => {
      task.classList.add('current-drag');
    });
    task.addEventListener('dragend', (e) => {
      task.classList.remove('current-drag');
      todo.updateIndex(domAfterReorder(e));
    });
  });

tasksWrapper.addEventListener('dragover', (event) => {
  event.preventDefault();
  const currentDragableTask = document.querySelector('.current-drag');
  const { closest } = closestElementToCurrentDrag(tasksWrapper, event.clientY);
  if (closest === undefined) tasksWrapper.appendChild(currentDragableTask);
  else tasksWrapper.insertBefore(currentDragableTask, closest);
});