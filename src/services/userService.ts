import * as userRepository from '@r/userRepository';
import {ErrorType} from "@se/error";
import {AuthStateType} from "@rx/authReducer";
import {prettyPrint} from "@u";
import {AllUndef, empty} from "@u2/utils";


// todo process errors (rejected Promises) from repo layer


type signUpType = (options: {
    surname: string
    name: string
    patronymic: string
    birth_date: number // timestamp / 1000
    email: string
    phone: string
    registration_city_id: string|number // todo type
    work_city_id: string|number // todo type
    password: string
    ref: string // инфа откуда узнали о Smart Sharing
}) => Promise<{ error?: ErrorType, jwt?: AuthStateType['jwt'], user?: AuthStateType['user'] }>
const signUp: signUpType = async (options) => {
    const response = await userRepository.singUp(options);
    const { error, status, payload } = response


    if (status >= 300) {
        return { error: { code: 'error' } }
    }

    const { jwt, user } = payload
    const data = {
        jwt: jwt,
        user: user
    }
    return data;
}


type signInType = (options: {
    phoneOrEmail: string
    password: string
}) => Promise<{ error?: ErrorType, jwt?: AuthStateType['jwt'], user?: AuthStateType['user'] }>
const signIn: signInType = async (options) => {
    const response = await userRepository.singIn(options);
    const { status, errors, payload, error } = response
    const { localCode } = error


    if (status >= 300){
        //console.log(status)
        //prettyPrint(errors)
        //prettyPrint(error)

        if (status === 400){
            if (localCode === 1) return { error: { code: 'incorrect-login' } }
            if (localCode === 2) return { error: { code: 'incorrect-password' } }
        } else if (status === 422) return { error: { code: 'incorrect-data' } }
        else return { error: { code: 'errors', data: errors } }
    }

    const { jwt, user } = payload
    const data = {
        jwt: jwt,
        user: user
    }
    return data;
}


// @ts-ignore
async function getFullUser() {
    const response = await userRepository.getFullUser();

    return response;
}


// @ts-ignore
async function getRents(options) {
    const response = await userRepository.getRents(options);

    return response;
}







// todo - OLD - uses session - replace with jwt and remove
type getAuthDataBySessionType = () =>
    Promise<{ error?: ErrorType, jwt?: AuthStateType['jwt'], user?: AuthStateType['user'] }>
const getAuthDataBySession: getAuthDataBySessionType = async () => {
    const response = await userRepository.getAuthDataBySession()
    const { error, status, payload } = response

    if (status === 403) return { error: { code: 403 } }
    if (status !== 200) return { error: { code: 'error', data: error } }

    const { jwt, ...user } = payload
    const data = {
        jwt,
        user
    }
    return data
}






// todo - uses session - replace with jwt and remove
type getCurrentJwtType = () => Promise<{ error?: ErrorType, jwt?: AuthStateType['jwt'] }>
const getCurrentJwt:getCurrentJwtType = async () => {
    const response = await userRepository.getCurrentJwt();
    const { status, payload } = response

    // todo error processing
    const data = {
        jwt: payload
    }

    return data;
}


// @ts-ignore
async function getDraft() {
    const response = await userRepository.getDraft();

    return response;
}


export {
    signUp,
    signIn,
    getFullUser,
    getRents,
    getAuthDataBySession,
    getCurrentJwt,
    getDraft
}