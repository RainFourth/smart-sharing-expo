import React from 'react'

// @ts-ignore
import LocationSvg from '@ic/ic-location.svg'

const LocationIc = ({color, size}: {color:string, size?:number|string}) => {
    return <LocationSvg
        width={size??'100%'}
        height={size??'100%'}
        stroke={color}
    />
}
export default LocationIc