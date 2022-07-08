

import {API_URL} from "@env";
import Axios, {AxiosResponse} from "axios"



const endpoint = API_URL+"/graphql"
//console.log("ENDPOINT: "+endpoint)
export const ax = Axios.create({
    baseURL: endpoint,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})