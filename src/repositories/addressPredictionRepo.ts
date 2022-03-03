import {wait} from "@u2/utils";


const cities = [
    {
        name: 'Иркутск',
        lat: 52.28771725041251,
        lon: 104.28070340632,
    }
]

export async function getPredictions(term: string){
    const delay = 3000
    const value = cities.find(city=>city.name.toLowerCase().includes(term.toLowerCase()))
    return wait(delay,value)
}