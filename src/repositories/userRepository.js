import { API_URL } from "@env";

import { fetcher, prettyPrint } from '@u';





async function singUp(options) {
    const response = await fetcher.post(`${API_URL}/auth/sign-up`, options);

    return response;
}

async function singIn(options) {
    const response = await fetcher.post(`${API_URL}/auth/sign-in`, options);

    return response;
}

// todo - uses session - replace with jwt and remove
async function getFullUser() {
    const response = await fetcher.get(`${API_URL}/users/current`, {
        query: {
            represent: 'full'
        }
    })

    return response;
}

// todo - uses session - replace with jwt and remove
async function getRents(options) {
    const response = await fetcher.get(`${API_URL}/users/current/rents`, options);

    return response;
}


// todo - OLD - uses session - replace with jwt and remove
async function getAuthDataBySession(){
    const response = fetcher.get(`${API_URL}/users/current?represent=session`)

    return response
}

// todo - uses session - replace with jwt and remove
async function getCurrentJwt() {
    const response = await fetcher.get(`${API_URL}/users/current/jwt`);

    return response;
}

// todo - uses session - replace with jwt and remove
async function getDraft() {
    const response = await fetcher.get(`${API_URL}/users/current/draft`);

    //prettyPrint(response);

    return response;
}

export {
    getAuthDataBySession,
    singUp,
    singIn,
    getFullUser,
    getRents,
    getCurrentJwt,
    getDraft
}