import myValue from './test.js';
import './style.css';

function component() {
  const element = document.createElement('div');

  element.innerHTML = myValue();

  return element;
}

document.body.appendChild(component());
