import './types'

const BASIC_URL: string = 'http://127.0.0.1:3000';

export const getCars = async (limit: number = 0, page: number = 1):Promise<ICar[]> => {
    const res = await fetch(`${BASIC_URL}/garage?_limit=${limit}&_page=${page}`);

    return res.json();
} 

export const getOneCar = async (id: number):Promise<ICar> => {
    const res = await fetch(`${BASIC_URL}/garage/${id}`);

    return await res.json();
}

export const createCar = async (car: ICar) => {
    await fetch(`${BASIC_URL}/garage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
    })
}

export const deleteCar = async (id: number) => {
    await fetch(`${BASIC_URL}/garage/${id}`, { method: 'DELETE' })
}

export const updateCar = async (id: number, car: ICar) => {
    await fetch(`${BASIC_URL}/garage/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
    });
}

export const engineStartStop = async (id: number, status: string): Promise<IEngine> => {
    const res = await fetch(`${BASIC_URL}/engine?id=${id}&status=${status}`, {
        method: 'PATCH'
    });

    return res.json();
}

export const switchEngineDriveMode = async (id: number): Promise<Response> => {
    const res = await fetch(`${BASIC_URL}/engine?id=${id}&status=drive`, {
        method: 'PATCH'
    });

    return res;
}

export const getWinners = async (limit: number = 0, page: number = 1, sort: string = 'id', order: string = 'ASC'): Promise<IWinner[]> => {
    const res = await fetch(`${BASIC_URL}/winners?_limit=${limit}&_page=${page}&_sort=${sort}&_order=${order}`);

    return res.json();
}

export const getOneWinner = async (id: number): Promise<IWinner> => {
    const res = await fetch(`${BASIC_URL}/winners/${id}`);

    return res.json();
}

export const createWinner = async (winner: IWinner) => {
    await fetch(`${BASIC_URL}/winners`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(winner)
    })
}

export const deleteWinner = async (id: number) => {
    await fetch(`${BASIC_URL}/winners/${id}`, { method: 'DELETE' })
}

export const updateWinner = async (id: number, winner: IWinner) => {
    await fetch(`${BASIC_URL}/winner/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(winner)
    });
}

// export default module.exports = {
//     getCars,
//     getOneCar,
//     createCar,
//     deleteCar,
//     updateCar,
//     engineStartStop,
//     switchEngineDriveMode,
//     getWinners,
//     getOneWinner,
//     createWinner,
//     deleteWinner,
//     updateWinner
// }