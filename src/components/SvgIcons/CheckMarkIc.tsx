import React from 'react'


// @ts-ignore
import CheckMarkSvg from '@ic/ic-check-mark.svg'

const CheckMarkIc = ({color, size}: {color:string, size?:number}) => {
    return <CheckMarkSvg
        width={size??'100%'}
        height={size??'100%'}
        stroke={color}
    />
}
export default CheckMarkIc