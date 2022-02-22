import {ErrorType} from "@se/error";
import {StyleSheet} from "react-native";


export type empty = null|undefined
export const isEmpty = <T>(o: empty|T): o is empty => o===null || o===undefined

// сделать каждое свойство переданного типа T не readonly и опциональным
export type Optional<T> = {
    -readonly [Prop in keyof T]?: T[Prop]
}
// каждое свойство в T должно быть не undefined
export type Require<T> = {
    [Prop in keyof T]-?: T[Prop]
}
// каждое свойство в T должно быть undefined и не обязательным
export type AllUndef<T> = {
    [Prop in keyof T]?: undefined
}

// XorType


// todo законспектировать себе keyof & Mapped Types
// объект с любым количеством любых свойств
// можно сделать {type: string}&anyObj и тогда можно задавать любые свойства но type будет обязателен
export type anyObj = { [prop in string | number]: any }

export const emptyFun: (...args: unknown[])=>unknown = ()=>{}



export const noErrors = <T>(o: {error?: ErrorType|empty} & T): o is Require<T> => !o.error



export const sg = StyleSheet.create({
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    transparent: {
        backgroundColor: '#00000000'
    }
})



/*

type err = {
    error?: ErrorType
}
type data = {
    jwt?: string
}

let fun = (): err & data => {
    const d = {
        error: {
            code: 'error'
        } as ErrorType
    }

    return d as typeof d.error extends empty ? data : err
}
let fun2 = (): err & data => {
    const d = {
        data: {
            jwt: "dksjflkj"
        }
    }

    return d as typeof d.error extends empty ? data : err
}

*/
