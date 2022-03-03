import { wait } from "@u2/utils";

const cities = [
    {
        id: 1,
        name: 'Иркутск',
        image_path: '150/ffff00'
    },
    {
        id: 2,
        name: 'Ангарск',
        image_path: '150/00ff00'
    }
]

const streets = [
    {
        id: 1,
        city_id: 1,
        name: 'улица Ленина'
    }
]


export async function getCities() {
    const response = {
        status: 200,
        payload: cities
    }

    return wait(1000,response);
}



export async function getStreets(cityId) {
    const response = {
        status: 200,
        payload: streets.filter(s=>s.city_id===cityId)
    }

    return response;
}