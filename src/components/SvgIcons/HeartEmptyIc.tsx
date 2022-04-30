import React from 'react'

// @ts-ignore
import HeartEmptySvg from '@ic/heart-empty.svg'

const HeartEmptyIc = ({color, size}: {color:string, size?:number|string}) => {
    return <HeartEmptySvg
        width={size??'100%'}
        height={size??'100%'}
        stroke={color}
    />
}
export default HeartEmptyIc