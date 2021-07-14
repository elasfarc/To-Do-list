import './style.css';

const tasks = [
  {
    description: 'task4',
    completed: false,
    index: 4,
  },
  {
    description: 'task2',
    completed: false,
    index: 2,
  },
  {
    description: 'task3',
    completed: false,
    index: 3,
  },

];
function displayTasks() {
  const fragment = document.createDocumentFragment();
  tasks
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
