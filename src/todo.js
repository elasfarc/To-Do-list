/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

export default class ToDoList {
    #storage;

    constructor() {
      this.seedTasks = [
        {
          description: 'do the grocery',
          completed: false,
          index: 1,
        },
        {
          description: 'pay bills',
          completed: false,
          index: 2,
        },
        {
          description: 'setup the modem',
          completed: false,
          index: 3,
        }, {
          description: 'home cleaning',
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
      updatedIndexArr = updatedIndexArr.map((ele) => ele.title);
      const output = [];
      updatedIndexArr.forEach((element) => {
        output.push(this.#storage.find((ele) => ele.description.trim() === element.trim()));
      });
      for (const i in output) {
        output[i].index = parseInt(i, 10) + 1;
      }
      this.#storage = output;
      this.updateLocalStorage();
    }

    updateLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.#storage));
    }
}
