import createElem from '../../helpers/createElement';
import { ICar } from '../../helpers/types';
import { inDrive, updateCarList } from '../car-option/car-option-view';
import { checkPagesCount } from '../garage-view';
import * as Controller from './edit-panel-controller';

let _updateInput: HTMLInputElement; 
let _updateColor: HTMLInputElement;
let _isWinner: boolean = false;

const marka = ['Tesla', 'Porshe', 'VW', 'BMW', 'Audi'];
const model = ['Model Y', '911', 'Golf', 'M3', 'TT'];

function animationEnd(id: string, width: number, car: HTMLElement) {
  car.style.transform = `translate(${width - 80}px)`;
  const resetButton = document.querySelector('.button[data-action="reset"]');
  (resetButton as HTMLInputElement).disabled = false;
 
  if (!_isWinner) {
    // Controller.setWinner();    

    // const dialog = createElem('h1', ['dialog']);
    // document.querySelector('body').appendChild(dialog);
    // dialog.innerHTML = `${car} is winner!`
    _isWinner = true;
  }  
}

function getRandomArbitrary() {
  return Math.round(Math.random() * 4);
}

async function handleClick(event: Event) {
  const button = event.target as HTMLInputElement;

  if (button.className !== 'button') {
    return;
  }

  switch (button.dataset.action) {
    case 'create': {
      const color = button.previousElementSibling as HTMLInputElement;
      const text = color.previousSibling as HTMLInputElement;
      
      Controller.create(text.value, color.value)
        .then(res => updateCarList(res, true));

      checkPagesCount();
      break;
    };
    case 'update': {
      const color = button.previousElementSibling as HTMLInputElement;
      const text = color.previousSibling as HTMLInputElement;

      const car = {
        id: Number(text.dataset.id),
        name: text.value,
        color: color.value
      }

      Controller.update(
        text.dataset.id, 
        car
      );

      updateCarList(car);

      button.disabled = true;
      color.disabled = true;
      color.value = '#000000';
      text.disabled = true;
      text.value = '';

      break;
    };
    case 'race': {
      const page = document.querySelector('.current-page').innerHTML.slice(-1);
      
      const times = await Controller.race(page);      

      const cars = document.querySelectorAll('.car');
      cars.forEach((car, idx) => {
        const trace = car.closest('.trace');
        const section = car.closest('section') as HTMLElement;
               
        const width = trace?.getBoundingClientRect().width;
        
        const animation = car.animate(
          [
            { transform: 'translate(0)' },
            { transform: `translate(${width - 80}px)` },
          ], 
          times[idx]
        )

        animation.addEventListener('finish', (event) => animationEnd(section.dataset.id, width, car as HTMLElement))

        inDrive(section.dataset.id, animation);
      }); 
      break;     
    }
    case 'reset': {
      const cars = document.querySelectorAll('.car');
      cars.forEach((car: HTMLElement) => {
        car.getAnimations()[0] ? car.getAnimations()[0].cancel() : car.style.transform = 'translate(0px)';
      });
      _isWinner = false;
      button.disabled = true;
      break;
    }
    case 'generate': {
      for (let i = 0; i < 100; i += 1) {
        const name = `${marka[getRandomArbitrary()]} ${model[getRandomArbitrary()]}`;
        const color = `#${i * getRandomArbitrary() + 458236}`;

        Controller.create(name, color)
        .then(res => updateCarList(res, true));

        checkPagesCount();
      }
      break;
    }
  }
}

export function activeUpdateBlock(car: Promise<ICar>) {
  _updateInput.disabled = false;
  _updateColor.disabled = false;
  (_updateColor.nextSibling as HTMLInputElement).disabled = false;

  car.then(res => {
    _updateInput.value = res.name;
    _updateInput.setAttribute('data-id', String(res.id))
    _updateColor.value = res.color;
  })
}

// for reusing code
function drawToolBlock(type: string): HTMLElement {
  const createBlock = createElem('div', [`${type.toLowerCase()}-block`]);

  const inputText = createElem('input') as HTMLInputElement;
  inputText.type = 'text';

  const inputColor = createElem('input') as HTMLInputElement;
  inputColor.type = 'color';

  const button = createElem(
    'button', 
    ['button'], 
    `${type}`, 
    ['data-action', `${type.toLowerCase()}`]
  ) as HTMLInputElement;

  if (type === 'Update') {
    _updateInput = inputText;
    _updateColor = inputColor;
    inputText.disabled = true;
    inputColor.disabled = true;
    button.disabled = true;
  }

  createBlock.append(inputText, inputColor, button);
  return createBlock;
}


export function drawEditPanel(): HTMLElement {
  const editPanel = createElem('section', ['edit-panel']);

  const createBlock = drawToolBlock('Create');
  const updateBlock = drawToolBlock('Update');

  const buttonsBlock = createElem('div', ['buttons-block']);

  const raceButton = createElem(
    'button', 
    ['button'], 
    'Race', 
    ['data-action', `race`]
  );

  const resetButton = createElem(
    'button', 
    ['button'],
    'Reset',
    ['data-action', `reset`]
  );
  (resetButton as HTMLInputElement).disabled = true;

  const generateButton = createElem(
    'button', 
    ['button'],
    'Generate cars',
    ['data-action', `generate`]
  );

  buttonsBlock.append(raceButton, resetButton, generateButton);
  editPanel.append(createBlock, updateBlock, buttonsBlock);

  editPanel.addEventListener('click', handleClick);

  return editPanel;
}