export function closestElementToCurrentDrag(tasksContainer, positionY) {
  const possibleElements = [...tasksContainer.querySelectorAll('.task:not(.current-drag)')];
  return possibleElements.reduce((accu, possibleElement) => {
    const dimensions = possibleElement.getBoundingClientRect();
    const offset = positionY - dimensions.top - dimensions.height / 3;
    if (offset < 0 && offset > accu.offset) return { offset, closest: possibleElement };
    return accu;
  }, { offset: Number.NEGATIVE_INFINITY });
}

export function taskTobeSwapped(e) {
  if (e.path[0].nodeName !== 'LI') return e.path[0].parentElement;
  return e.target;
}

export function exchangeElements(parent, element1, element2) {
  const clonedElement1 = element1.cloneNode(true);
  const clonedElement2 = element2.cloneNode(true);
  parent.replaceChild(clonedElement1, element2);
  parent.replaceChild(clonedElement2, element1);
}

export function domAfterReorder(e) {
  const childrenList = [...e.target.parentElement.children];
  return childrenList.map((child) => ({ id: child.id, title: child.innerText }));
}

export function displayTasks(obj) {
  const fragment = document.createDocumentFragment();

  obj.storage
    .forEach((task) => {
      const listItem = emptyTaskComponent(task, obj);
      fragment.append(listItem);
    });
  return fragment;
}


export function emptyTaskComponent(task, obj){
  const fragment = document.createDocumentFragment();
  const listItem = document.createElement('li');
  listItem.classList.add('task');
  listItem.setAttribute('draggable', 'true');
  listItem.id = task.index;

  //create a checkbox and add eventLis to it 
  const taskStatusCheckbox = document.createElement('input')
  taskStatusCheckbox.classList.add('task-status');
  taskStatusCheckbox.type = 'checkbox';
  if(task.completed) taskStatusCheckbox.setAttribute('checked', true)         
  listItem.appendChild(taskStatusCheckbox)
  //add event listeners
  listItem.addEventListener('change', (event) => {
    const index = task.index;
    obj.statusUpdate(index);
  })
  listItem.addEventListener('dragstart', () => {
    listItem.classList.add('current-drag');
  });
  listItem.addEventListener('dragend', (e) => {
    listItem.classList.remove('current-drag');
    obj.updateIndex(domAfterReorder(e));
  });


  listItem.innerHTML += `
      <span class='internal-text'>${task.description}</span>
      <span class="icon-move">
        <i class="icon fas fa-ellipsis-v"></i>
      </span>
  `
  fragment.append(listItem);
  return fragment;
}