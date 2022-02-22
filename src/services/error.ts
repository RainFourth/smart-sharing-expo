import {empty} from "@u2/utils";


export type ErrorType = {
    code: 401 | 403 // unauthorized while login | forbidden if try to access to resource and can't
        | 'error' | 'errors'
        | 'no-internet' | 'no-server'
        | 'incorrect-data' | 'incorrect-login' | 'incorrect-password'
    data?: any
}