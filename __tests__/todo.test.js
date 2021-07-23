/**
 * @jest-environment jsdom
*/
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

  
});
