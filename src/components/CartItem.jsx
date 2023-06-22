import React, { useContext, useEffect, useState } from 'react'

import { useAuth0 } from "@auth0/auth0-react";
import {auth} from '../config/firebase'
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from '../config/firebase';
// import CartContext from '../context/cart';

const CartItem = (props) => {
  const [user,setUser]=useState(null)
  let idx=props.idx
  const uid=props.uid
  let q=props.product[idx].q
  const[qty,setQty]=useState(q)
  // const { loginWithRedirect,logout,user, isAuthenticated, isLoading } = useAuth0();

  let num=0
  let item =props.item;
  const cartRef = doc(db, "cart", uid);
  let product=props.product
  
  
  
    const incrementHandler=(idx)=>{
        product[idx].q++;
        console.log(product)
        setDoc( cartRef,{"Products":product})
        setQty((prev)=>(prev+=1))
        props.setTotal((prev)=>(Math.round((prev+item.price)*100)/100))
   
     }
    const decrementHandler=(idx)=>{
    if(qty>1)
    {
        product[idx].q--;
        console.log(product)
        setDoc( cartRef,{"Products":product})
        setQty((prev)=>(prev-=1))
        props.setTotal((prev)=>(Math.round((prev-item.price)*100)/100))
    

    }
    }
    
    useEffect(()=>{ 
      if(item){
      num=Math.round(item.price*qty*100)/100;}

      props.setTotal((prev)=>(Math.round((prev+num)*100)/100))
      
    },[product])
    
const deleteHandler=()=>{
  // num=Math.round(item.price*qty*100)/100;
  // (prev)=>(Math.round((prev-num)*100)/100)
  
  props.setTotal(0)
  var data_filter = product.filter( (element,i) => i!==idx)
  console.log(data_filter)

  setDoc( cartRef,{"Products":data_filter});

  console.log(data_filter);
    props.setProduct(data_filter)
    
}
   if(item){
  return  (
    
    <div key={item.id} className="cart-item">
      <img src={item.image} alt={item.title} className="cart-item__image" />
      <div className="cart-item__details">
        <h3 className="cart-item__title">{item.title}</h3>
       <div className="price-segment d-flex justify-content-around">
       <p className="cart-item__price">${item.price}</p>
        <div className='d-flex '>
        <button  className='m-1' onClick={()=>{decrementHandler(idx)}}>-</button>
       <p className="cart-item__price">{ qty }</p>
       <button  className='m-1' onClick={()=>{incrementHandler(idx)}}>+</button>
        </div>
       <p className="cart-item__price">${Math.round(item.price*qty*100)/100}</p>

        <button
          className="cart-item__remove"
          onClick={() =>(deleteHandler(idx))}
        >
          Remove
        </button>
       </div>
      </div>
    </div>)}
    else{
      return(<></>)
    }
  

  
}

export default CartItem