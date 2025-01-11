import * as Model from './garage-model';

export function getAllCars(page: number = 1) {
 
  return Model.getAllCars(page);
}