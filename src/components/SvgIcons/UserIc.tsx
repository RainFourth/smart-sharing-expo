import React from 'react'

// @ts-ignore
import UserSvg from '@ic/ic-user.svg'

const UserIc = ({color, size}: {color:string, size?:number}) => {
    return <UserSvg
        width={size??'100%'}
        height={size??'100%'}
        stroke={color}
    />
}
export default UserIc