export default function closestElementToCurrentDrag(tasksContainer, positionY) {
  const possibleElements = [...tasksContainer.querySelectorAll('.task:not(.current-drag)')];
  return possibleElements.reduce((accu, possibleElement) => {
    const dimensions = possibleElement.getBoundingClientRect();
    const offset = positionY - dimensions.top - dimensions.height / 2;
    if (offset < 0 && offset > accu.offset) return { offset, closest: possibleElement };
    return accu;
  }, { offset: Number.NEGATIVE_INFINITY });
}
