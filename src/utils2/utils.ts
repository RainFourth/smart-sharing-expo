export type empty = null|undefined
export const isEmpty = <T>(o: empty|T): o is empty => o===null || o===undefined
export const nonEmpty = <T>(o: empty|T): o is T => o!==null && o!==undefined


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



//export const noErrors = <T>(o: {error?: ErrorType|empty} & T): o is Require<T> => !o.error


export const wait = <T>(delay:number, value:T) => new Promise<T>(resolve => setTimeout(resolve,delay,value))


export const inf = 1000000

export const inRange = (min:number, max:number, curr:number) => {
    if (curr<min) return min
    if (curr>max) return max
    return curr
}




export type Comparator<T> = (o1: T, o2: T)=>number
export const defaultComparator: Comparator<any> = (o1,o2) => {
    if (o1==o2) return 0
    else if (o1<o2) return -1
    else if (o1>o2) return 1
    else return 0
}
