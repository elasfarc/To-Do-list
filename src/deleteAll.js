/* eslint-disable import/prefer-default-export */
export function removeAllCompletedHandler(todo) {
  const completedTasks = todo.allCompleted();

  completedTasks.forEach((task) => {
    document.querySelector(`[data-current-value= "${task.description}"]`)
      .parentElement
      .parentElement
      .remove();
    todo.removeTask(task.index);
  });
}