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
      this.updateLocalStorage();
    }

    get storage() {
      return this.#storage;
    }

    add() {
        // let added = { description: '2AM', index: 45, completed: false }
        // this.statusUpdate();
        // this.#storage.push(added);
    }

    statusUpdate(i){
        const completedTask = this.#storage.filter(task =>  task.index === parseInt(i)); 
        completedTask[0].completed = !completedTask[0].completed;
        this.updateLocalStorage();
    }

    updateLocalStorage(){
        localStorage.setItem('tasks', JSON.stringify(this.#storage));
    }

}