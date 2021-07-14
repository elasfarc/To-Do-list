// import { json } from 'body-parser';
// import Task from './task.js';

export default class ToDoList {
    #storage;

    constructor() {
      this.seedTasks = [
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
      this.#storage = JSON.parse(localStorage.getItem('tasks')) || this.seedTasks;
    }

    get storage() {
      return this.#storage;
    }

    add() {
      this.#storage.push({ description: '2AM', index: 45 });
      localStorage.setItem('tasks', JSON.stringify(this.#storage));
    }
}