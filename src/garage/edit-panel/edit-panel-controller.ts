import { ICar } from '../../helpers/types';
import * as Model from './edit-panel-model';

export function create(name: string, color: string) {
  return Model.create(name, color);
}

export function race(page: string) {
  return Model.race(Number(page));
}

export function update(id: string, car: ICar) {
  return Model.update(Number(id), car);
}