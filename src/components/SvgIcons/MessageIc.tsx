import React from 'react'

// @ts-ignore
import MessageSvg from '@ic/ic-message.svg'

const MessageIc = ({color, size}: {color:string, size?:number}) => {
    return <MessageSvg
        width={size??'100%'}
        height={size??'100%'}
        stroke={color}
    />
}
export default MessageIc