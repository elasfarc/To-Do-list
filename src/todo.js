/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import Task from './task.js';

export default class ToDoList {
    #storage;

    constructor() {
      this.#storage = JSON.parse(localStorage.getItem('tasks')) || [];
      this.updateLocalStorage();
    }

    get storage() {
      return this.#storage;
    }

    addTask({ description }) {
      const taskId = this.nextTaskId();
      const task = new Task({ index: taskId, description });
      this.#storage.push(task);
      this.updateLocalStorage();
      return task;
    }

    nextTaskId() {
      const lastTaskIndex = this.#storage.length - 1;
      const returnedID = (this.#storage.length > 0) ? (this.#storage[lastTaskIndex].index + 1) : 1;
      return returnedID;
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
