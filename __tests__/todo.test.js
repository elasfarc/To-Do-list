/**
 * @jest-environment jsdom
*/
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import ToDoList from '../src/todo.js';
import { removeAllCompletedHandler } from '../src/deleteAll.js';

describe('ToDoList', () => {
  localStorage.clear();
  jest.clearAllMocks();

  const todo = new ToDoList();

  describe('#descriptionUpdate', () => {
    it('modifies the task description', () => {
      localStorage.clear();
      jest.clearAllMocks();

      const task = todo.addTask({ description: 'Task-R' });

      todo.descriptionUpdate(task.index, 'Task-R UPDATED!');

      expect(JSON.parse(localStorage.__STORE__.tasks)[task.index - 1].description).toEqual('Task-R UPDATED!');
    });
  });

  describe('#statusUpdate', () => {
    describe('when task status is not completed', () => {
      it('marks it completed', () => {
        const myTask = todo.addTask({ description: 'mmm' });
        const { index } = myTask;
        todo.statusUpdate(index);

        expect(myTask.completed).toBe(true);
        expect(JSON.parse(localStorage.__STORE__.tasks)[myTask.index - 1].completed).toEqual(true);
      });
      describe('when task status is completed', () => {
        it('marks it uncompleted', () => {
          const myTask = todo.addTask({ description: 'mmm', completed: true });
          const { index } = myTask;
          todo.statusUpdate(index);

          expect(myTask.completed).toBe(false);
          expect(JSON.parse(localStorage.__STORE__.tasks)[myTask.index - 1].completed).toEqual(false);
        });
      });
    });
    localStorage.clear();
  });

  describe('#updateIndex', () => {
    localStorage.clear();
    const task1 = todo.addTask({ description: 'task1' });
    const task2 = todo.addTask({ description: 'task2' });
    const task3 = todo.addTask({ description: 'task3' });

    expect(task1.index).toEqual(1);
    expect(task2.index).toEqual(2);
    expect(task3.index).toEqual(3);

    it('It updates the index of draged item based on the new position', () => {
      const afterDragAndDropOrder = [
        {
          id: '2',
          title: 'task2',
        },
        {
          id: '1',
          title: 'task1',
        },
        {
          id: '3',
          title: 'task3',
        },
      ];

      todo.updateIndex(afterDragAndDropOrder);

      expect(task1.index).toEqual(2);
      expect(task2.index).toEqual(1);
      expect(task3.index).toEqual(3);

      localStorage.clear();
      jest.clearAllMocks();
    });
  });

  describe('#removeTask', () => {
    localStorage.clear();

    const todolist = new ToDoList();
    todolist.addTask({ description: 'task1' });
    const task2 = todolist.addTask({ description: 'task2' });
    todolist.addTask({ description: 'task3' });

    it('removes the task from the storage based on it\'s index ', () => {
      todo.removeTask(task2.index - 1);

      expect(JSON.parse(localStorage.__STORE__.tasks).length).toBe(2);
      expect(JSON.parse(localStorage.__STORE__.tasks)[1].description).toBe('task3');
    });
  });

  describe('#removeAllCompletedHandler', () => {
    localStorage.clear();

    test('remove all completed tasks from the DOM', () => {
      localStorage.clear();

      const todolis = new ToDoList();
      todolis.addTask({ description: 'task1', completed: true });
      todolis.addTask({ description: 'task2', completed: false });

      document.body.innerHTML = `
              <input id="newTodoInput" />
              <button id="addTodoBtn">Add todo</button>
              <ul class="list-wrapper">

                <li class="task" draggable="true" id="1"><input class="task-status" type="checkbox">
                    <div action="" class="form" name="add_task">
                        <input class="text-input" type="text" name="task_description" value="task1" data-current-value="task1">
                    </div>
               </li>

               <li class="task" draggable="true" id="2"><input class="task-status" type="checkbox">
                    <div action="" class="form" name="add_task">
                        <input class="text-input" type="text" name="task_description" value="task2" data-current-value="task2">
                    </div>
               </li>
              </ul>
              <div class="rmv-completed">
                <a class="rmv-completed-action" href="#">
                    <p>
                    clear all completed
                </p></a>
              </div>
            `;

      const container = document.querySelector('.list-wrapper');

      const deleteAllCompleted = document.querySelector('.rmv-completed-action p');

      deleteAllCompleted.addEventListener('click', removeAllCompletedHandler(todolis));
      deleteAllCompleted.click();

      const tasks = container.querySelectorAll('li');

      expect(tasks).toHaveLength(1);
      expect(tasks[0].id).toBe('2');
    });
  });
});
