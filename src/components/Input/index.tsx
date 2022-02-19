import React from 'react';
import * as InputsType from './InputsType';


type InputTypes = {
    type: "password" | "name" | "email" | "date" | "phone" | "dropdown" | "default" | "list"
    list?: unknown[]
    values?: unknown[]
    onUpdate?(...args: unknown[]): unknown
    placeholder?: string
    onChange?(...args: unknown[]): unknown
    keyboardType?: string
    value?: any
    disabled?: boolean
    description?: any
    warning?: any
    multiline?: boolean
    maxLength?: any
    autoCompleteType?: string
    items?: unknown[]
    zIndex?: number
    mainStyle?: object
    confirmation?: boolean
    startErrroText?: boolean
    check?: boolean
}

function Input(props: InputTypes) {
    return (
        <>
            {React.createElement(InputsType[props.type], props)}
        </>
    )
}

export { Input }