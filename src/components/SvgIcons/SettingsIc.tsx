import React from 'react'

// todo изучить свойства svg g defs clipPath
// @ts-ignore
import SettingsSvg from '@ic/ic-settings.svg'

const SettingsIc = ({color, size}: {color:string, size?:number}) => {
    return <SettingsSvg
        width={size??'100%'}
        height={size??'100%'}
        stroke={color}
    />
}
export default SettingsIc