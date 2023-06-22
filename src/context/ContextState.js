import React from 'react'
import UserState from './UserState'
import FilterState from './FilterState'

const ContextState = (props) => {
  return (
    <UserState>
        <FilterState>
            {props.children}
        </FilterState>
    </UserState>
  )
}

export default ContextState