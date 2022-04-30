import React from 'react'

// @ts-ignore
import HeartSvg from '@ic/heart.svg'

const HeartIc = ({color, size}: {color:string, size?:number|string}) => {
    return <HeartSvg
        width={size??'100%'}
        height={size??'100%'}
        fill={color}
    />
}
export default HeartIc