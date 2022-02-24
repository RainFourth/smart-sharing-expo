import {useEffect, useState} from "react";


export const useVariants = <V>(variants:V[], selected:V[] = []) => {
    const [t,setT] = useState(variants)
    const [s,setS] = useState(selected)
    useEffect(()=>setT(variants),[variants])
    useEffect(()=>setS(selected),[selected])

    const onSelect = (v:V) => {
        if (s.includes(v)) setS(s.filter(st=>st!==v))
        else setS([...s, v])
    }

    return [t, s, onSelect] as const
}