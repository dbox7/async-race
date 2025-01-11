import * as Server from '../../helpers/server-api';
import { ICar } from '../../helpers/types';

export async function create(name: string, color: string) {
  return await Server.createCar({
    name,
    color,
  })
}

export async function update(id: number, car: ICar) {
  Server.updateCar(id, car);
  
}

export async function race(page: number) {
  const cars = Server.getCars(page, 7);

  const carData = await Promise.all((await cars).map(async (car) => {
    const res = await Server.engineStartStop(car.id, 'started');
    const time = res.distance / res.velocity;
    return time;
  }));
  
  return carData;  
}