// import { json } from 'body-parser';
// import Task from './task.js';

export default class ToDoList {
    #storage;

    constructor() {
      this.seedTasks = [
        {
          description: '1',
          completed: false,
          index: 1,
        },
        {
          description: '2',
          completed: false,
          index: 2,
        },
        {
          description: '3',
          completed: false,
          index: 3,
        }, {
          description: '4',
          completed: false,
          index: 4,
        },

      ];
      this.#storage = JSON.parse(localStorage.getItem('tasks')) || this.seedTasks;
      this.updateLocalStorage();
    }

    get storage() {
      return this.#storage;
    }

    statusUpdate(i) {
      const completedTask = this.#storage.filter((task) => task.index === parseInt(i, 10));
      completedTask[0].completed = !completedTask[0].completed;
      this.updateLocalStorage();
    }

    updateIndex(updatedIndexArr) {
      for (let i = 0; i < updatedIndexArr.length; i += 1) {
        const x = this.#storage
          .find((task) => task.index === parseInt(updatedIndexArr[i], 10));
        x.index = i + 1;
      }
      this.updateLocalStorage();
    }

    updateLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.#storage));
    }
}
