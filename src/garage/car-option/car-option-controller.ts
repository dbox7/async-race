import * as Model from './car-option-model';

export function select(id: string) {
  return Model.select(Number(id)); 
};

export function deleteCar(id: string): void {
  Model.deleteCar(Number(id)); 
}

export function start(id: string) {
  return Model.start(Number(id));
}

export function stop(id: string) {
  return Model.stop(Number(id));
}

export function inDrive(id: string, animation: Animation) {
  Model.inDrive(Number(id), animation);
}