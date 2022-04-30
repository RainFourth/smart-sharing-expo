import React from 'react'

// @ts-ignore
import AreaSvg from '@ic/ic-area.svg'

const AreaIc = ({color, size}: {color:string, size?:number}) => {
    return <AreaSvg
        width={size??'100%'}
        height={size??'100%'}
        stroke={color}
    />
}
export default AreaIc