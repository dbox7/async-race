import createElem from '../helpers/createElement';
import { drawCarList } from './car-option/car-option-view';
import { drawEditPanel } from './edit-panel/edit-panel-view';
import { ICar } from '../helpers/types';
import * as Controller from './garage-controller';

let _currentPage = 1;

async function pagginationHandle(event: Event) {
  if ((event.target as HTMLElement).innerHTML === 'Prev') {    
    _currentPage -= 1;
    console.log(_currentPage);
    if (_currentPage == 1) {
      (document.querySelector('.prev') as HTMLInputElement).disabled = true;
      (document.querySelector('.next') as HTMLInputElement).disabled = false;
    }
  } else {
    _currentPage += 1;
    console.log(_currentPage);
    (document.querySelector('.prev') as HTMLInputElement).disabled = false;
    checkPagesCount()
  }
  document.querySelector('.current-page').innerHTML = `Page #${_currentPage}`;
  const cars = await Controller.getAllCars(_currentPage);
  drawCarList(cars);
}

export async function checkPagesCount() {
  const cars = await Controller.getAllCars(_currentPage + 1);
  if (cars.length > 0) {
    (document.querySelector('.next') as HTMLInputElement).disabled = false;
  } else {
    (document.querySelector('.next') as HTMLInputElement).disabled = true;
  }
  
}

export async function drawGarage() {

  const main = createElem('main', ['main']);
  main!.innerHTML = '';

  const garage = createElem('article', ['garage']);
  
  const cars = await Controller.getAllCars();
  
  const page = createElem('h2', ['current-page'], `Page #${_currentPage}`)

  const editPanel = drawEditPanel();
  const carList = drawCarList(cars);

  const paggination = createElem('div', ['paggination']);

  const prevButton = createElem('button', ['button', 'prev']) as HTMLInputElement;
  prevButton.innerHTML = 'Prev';
  prevButton.disabled = true;
  const nextButton = createElem('button', ['button', 'next']);
  nextButton.innerHTML = 'Next';
  checkPagesCount();

  paggination.append(prevButton, nextButton);
  paggination.addEventListener('click', pagginationHandle);
  
  garage.append(editPanel, page, carList, paggination);
  main.appendChild(garage);
  document.body.appendChild(main);
}