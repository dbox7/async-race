import * as Server from '../../helpers/server-api';
import { ICar } from '../../helpers/types';

export async function select(id: number): Promise<ICar> {
  return await Server.getOneCar(id);
};

export function deleteCar(id: number): void {
  Server.deleteCar(id);
}

export async function inDrive(id: number, animation: Animation) {
  try {
    const res = await Server.switchEngineDriveMode(id);
    if (res.status === 500) {
      throw new Error('stop');
    }
  } catch(e) {
    animation.pause();
    console.log('stopped', e);
  }
  
}

export async function start(id: number) {
  const res = await Server.engineStartStop(id, 'started');
  const time = res.distance / res.velocity;
  
  return time; 
}

export async function stop(id: number) {
  await Server.engineStartStop(id, 'stopped'); 
}