import React from 'react'

// @ts-ignore
import SearchSvg from '@ic/ic-search.svg'

const SearchIc = ({color, size}: {color:string, size?:number}) => {
    return <SearchSvg
        width={size??'100%'}
        height={size??'100%'}
        stroke={color}
    />
}
export default SearchIc