import myValue from './test.js';
//import Task from './task.js'
import './style.css';

const tasks = [
    {
        description: 'task4',
        completed: false,
        index: 4
    }, 
       {
        description: 'task2',
        completed: false,
        index: 2
    },
        {
        description: 'task3',
        completed: false,
        index: 3
    }

]
function displayTasks(){
    let fragment = document.createDocumentFragment();
    tasks
    .sort((a,b)=>(a.index - b.index))
    .forEach(task => {
        let listItem = document.createElement('li');
        listItem.innerText = task.description;
        fragment.append(listItem)
    });
    return fragment;
}

 let tasksWrapper = document.querySelector('.list-container');
 tasksWrapper.append(displayTasks());


