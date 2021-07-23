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

  
});
