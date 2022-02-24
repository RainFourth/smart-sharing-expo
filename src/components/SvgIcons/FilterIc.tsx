import React from 'react'

// @ts-ignore
import FilterSvg from '@ic/ic-filter.svg'

const FilterIc = ({color, size}: {color:string, size?:number}) => {
    return <FilterSvg
        width={size??'100%'}
        height={size??'100%'}
        stroke={color}
    />
}
export default FilterIc