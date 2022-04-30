import React from 'react'

// @ts-ignore
import BackArrowSvg from '@ic/ic-back-arrow.svg'

const BackArrowIc = ({color, size}: {color:string, size?:number}) => {
    return <BackArrowSvg
        width={size??'100%'}
        height={size??'100%'}
        stroke={color}
    />
}
export default BackArrowIc