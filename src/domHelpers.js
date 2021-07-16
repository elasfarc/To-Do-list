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
