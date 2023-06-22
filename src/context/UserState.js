import React,{useEffect, useState} from 'react'
import UserContext from './user'
const initial=null


const UserState = (props) => {
 const[state,setState]=useState(initial)
    
    
    
    const updateCart=(arg)=>{
        setState(arg);
    }
    
      return (
        <UserContext.Provider value={{state,updateCart}}>
            {props.children}
        </UserContext.Provider>
      )
    }

export default UserState