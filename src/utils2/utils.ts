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
    [Prop in keyof T]-?: undefined
}

// XorType


// todo законспектировать себе keyof & Mapped Types
// объект с любым количеством любых свойств
// можно сделать {type: string}&anyObj и тогда можно задавать любые свойства но type будет обязателен
export type anyObj = { [prop in string | number]: any }

export const emptyFun: (...args: unknown[])=>unknown = ()=>{}



//export const noErrors = <T>(o: {error?: ErrorType|empty} & T): o is Require<T> => !o.error


export const wait = async <T>(delay:number, value:T) => new Promise<T>(resolve => setTimeout(resolve,delay,value))


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


// Get return type of function - TypeScript already contains ReturnType
//export type ReturnType<Fun> = Fun extends (...args: never[]) => infer Return ? Return : never



export type PromiseType<P extends Promise<any>> = P extends Promise<infer T> ? T : never




export const halfUp = (n: number, r: number): number => {
    const mult = Math.pow(10, r)
    return n>=0? Math.round(n*mult)/(mult) : -Math.round(-n*mult)/mult
}


export const groupBy = <T> (objs: T[], stringkeyExtractor: (obj:T)=>string) => {
    const map = new Map<string, T[]>()
    objs.forEach(o=>{
        let key = stringkeyExtractor(o)
        if (!map.has(key)) map.set(key,[o])
        // @ts-ignore
        else map.get(key).push(o)
    })
    return map
}
export const reduce = <K,V,NV> (map: Map<K,V[]>, initNewVal: (anyVal:V,key:K)=>NV, reduce: (v:V,nv:NV)=>NV) => {
    const newMap = new Map<K,NV>()
    map.forEach((vs,k)=>{
        if (vs.length===0) return
        let newVal: NV;
        vs.forEach((v,i)=>{
            if (i===0) newVal = initNewVal(v,k)
            else newVal = reduce(v,newVal)
        })
        // @ts-ignore
        newMap.set(k,newVal)
    })
    return newMap
}
