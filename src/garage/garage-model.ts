import * as server from '../helpers/server-api';

export async function getAllCars(page: number = 1) {
    
  return await server.getCars(page);
}