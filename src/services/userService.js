import * as userRepository from '@r/userRepository';

async function signUp(options) {
    const response = await userRepository.singUp(options);

    return response;
}

async function singIn(options) {
    const response = await userRepository.singIn(options);

    return response;
}

async function getFullUser() {
    const response = await userRepository.getFullUser();

    return response;
}

async function getRents(options) {
    const response = await userRepository.getRents(options);

    return response;
}

async function getCurrentJwt() {
    const response = await userRepository.getCurrentJwt();

    return response;
}

async function getDraft() {
    const response = await userRepository.getDraft();

    return response;
}

export {
    signUp,
    singIn,
    getFullUser,
    getRents,
    getCurrentJwt,
    getDraft
}