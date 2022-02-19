import React from 'react';
import * as ModalType from './ModalType';



type ModalMessageType = {
    modalRef: any
    type: 'default'|'custom'
    cancel?: boolean
    buttonDir?: 'row'|'column'
    icon?: React.ReactElement
    onAccept?(...args: unknown[]): unknown
    onReject?(...args: unknown[]): unknown
}

function ModalMessage(props: ModalMessageType) {
    return <>
            {React.createElement(ModalType[props.type], props)}
        </>
}

export { ModalMessage }