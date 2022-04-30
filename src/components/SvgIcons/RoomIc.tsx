import React from 'react'

// @ts-ignore
import RoomSvg from '@ic/ic-room.svg'

const RoomIc = ({color, size}: {color:string, size?:number}) => {
    return <RoomSvg
        width={size??'100%'}
        height={size??'100%'}
        stroke={color}
    />
}
export default RoomIc