import createElem from '../../helpers/createElement'; 
import { ICar, IEngine } from '../../helpers/types';
import * as Controller from './car-option-controller';
import { activeUpdateBlock } from '../edit-panel/edit-panel-view';
import { carSVG } from './car';

export function inDrive(id: string, animation: Animation) {
  Controller.inDrive(id, animation);
}

function carListClick(event: Event) {
  const button = event.target as HTMLElement;
  
  if (button.className !== 'button') {
    return;
  }

  const section = button.closest('section');
  const trace = section.lastElementChild.lastElementChild;

  switch (button.dataset.action) {
    case 'select': {
      const car = Controller.select(section.dataset.id);
      activeUpdateBlock(car);
      break;
    };

    case 'delete': {
      Controller.deleteCar(section.dataset.id);
      section.remove();
      break;
    };

    case 'start': {
      const time = Controller.start(section.dataset.id);
      time.then((time) => {
        const stopButton = (button.nextElementSibling as HTMLInputElement);
        stopButton.disabled = false;
        const width = trace?.getBoundingClientRect().width;
        const car = trace.children[0] as HTMLElement;        

        const animation = car.animate([
          { transform: 'translate(0)' },
          { transform: `translate(${width - 80}px)` },
        ], time);

        inDrive(section.dataset.id, animation);

        animation.onfinish = () => {
          car.style.transform = `translate(${width - 80}px)`;
        }
      });
      break;      
    };

    case 'stop': {
      Controller.stop(section.dataset.id);
      const car = trace.children[0] as HTMLElement;
      const animation = car.getAnimations()[0];
      animation ? animation.cancel() : car.style.transform = 'translate(0)';
      (button as HTMLInputElement).disabled = true;
    }
  }
}

function drawCarOption(item: ICar) {
  const carOption = createElem(
    'section', 
    ['car-option'], 
    '', 
    ['data-id', `${item.id}`]
  );

  const header = createElem('div', ['car-header']);
  const main = createElem('div', ['car-main']);

  const selectButton = createElem(
    'button', 
    ['button'], 
    'Select', 
    ['data-action', 'select']
  );

  const deteleButton = createElem(
    'button', 
    ['button'], 
    'Delete', 
    ['data-action', 'delete']
  );

  const h3 = createElem('h3');
  h3.innerHTML = item.name;

  header.append(selectButton, deteleButton, h3);
  
  const startButton = createElem(
    'button', 
    ['button'], 
    'Start', 
    ['data-action', 'start']
  );

  const stopButton = createElem(
    'button', 
    ['button'], 
    'Stop', 
    ['data-action', 'stop']
  );
  (stopButton as HTMLInputElement).disabled = true;

  const trace = createElem('div', ['trace']);
  const car = createElem('div', ['car']);
  car.setAttribute('data-id', `${item.id}`)
  car.innerHTML = carSVG;
  trace.appendChild(car);

  main.append(startButton, stopButton, trace)

  carOption.append(header, main);
  return carOption;
}

export function updateCarList(car: ICar, add: boolean = false) {
  if (add) {
    const carList = document.querySelector('.car-list');
    if (carList.children.length < 7) {
      const option = drawCarOption(car);
      carList.appendChild(option);
    }
  } else {
    const updCar = document.querySelector(`.car[data-id="${car.id}"]`) as HTMLElement;
    const title = updCar.closest('.car-main').previousElementSibling.lastChild as HTMLElement;

    title.innerHTML = car.name;
    updCar.style.background = car.color;
  } 
}

export function drawCarList(cars: ICar[]) {
  console.log(cars);
  
  let carList = document.querySelector('.car-list');
  if (!carList) {
    carList = createElem('article', ['car-list']);
    carList.addEventListener('click', carListClick);
  } else {
    carList.innerHTML = '';
  }

  cars.forEach((item) => {
    const carOption = drawCarOption(item);
    carList.appendChild(carOption);
  });

  return carList;
}