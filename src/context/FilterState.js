import React, { useState } from 'react'
import FilterContext from "./filter";
const initial={
    "filter":'All'
}

const FilterState = (props) => {


const[state,setState]=useState(initial)
const updateFilter=(arg)=>{
    setState({"filter":arg});
}

  return (
    <FilterContext.Provider value={{state,updateFilter}}>
        {props.children}
    </FilterContext.Provider>
  )
}

export default FilterState