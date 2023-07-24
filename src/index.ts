import '../style.css';
import * as server from './server-api';

function createEl(type: string, ...cl: string[]) {
    const res = document.createElement(type);
    cl.forEach((item) => res.classList.add(item));
    return res;
}

async function handleClick(event: MouseEvent) {
    const button = event.target as HTMLElement;

    if (button.className !== 'button') {
        return;
    }

    const id = Number(button.dataset.id);
    const movingParams = await server.engineStartStop(id, 'started');
    await server.switchEngineDriveMode(id);

    const trace = button.nextElementSibling;
    const width = trace?.getBoundingClientRect().width;

    const time = movingParams.distance / movingParams.velocity;
    const car = trace.children[0];

    car.animate([
        { transform: 'translate(0)' },
        { transform: `translate(${width - 50}px)` },
    ], time);
}

// get cars

async function init() {
    const cars = await server.getCars();
    const garage = document.querySelector('.garage');
    garage.addEventListener('click', handleClick);

    console.log(cars);
    cars.forEach((item) => {
        const carMenu = createEl('div', 'car-menu');

        const startButton = createEl('button', 'button');
        startButton.innerHTML = 'Start';

        const trace = createEl('div', 'trace');
        const car = createEl('div', 'car');

        startButton.setAttribute('data-id', `${item.id}`);

        trace.appendChild(car);
        carMenu.append(startButton, trace);
        garage.appendChild(carMenu);
    });
}

init();
