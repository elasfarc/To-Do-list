import './style.css';
import ToDoList from './todo.js';

import { closestElementToCurrentDrag, displayTasks } from './domHelpers.js';


const todo = new ToDoList();
const tasksWrapper = document.querySelector('.list-wrapper');
tasksWrapper.append(displayTasks(todo));


tasksWrapper.addEventListener('dragover', (event) => {
  event.preventDefault();
  const currentDragableTask = document.querySelector('.current-drag');
  const { closest } = closestElementToCurrentDrag(tasksWrapper, event.clientY);
  if (closest === undefined) tasksWrapper.appendChild(currentDragableTask);
  else tasksWrapper.insertBefore(currentDragableTask, closest);
});


