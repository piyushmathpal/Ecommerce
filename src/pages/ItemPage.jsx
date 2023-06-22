import React,{useEffect,useState,useContext} from 'react'
import { useParams } from 'react-router-dom'

import { db } from '../config/firebase';
import { getDoc,collection,doc,setDoc } from 'firebase/firestore';
import Spinner1 from '../components/Spinner';
import {auth} from '../config/firebase'
import { useNavigate } from 'react-router-dom';
const ItemPage = () => {
  const navigate= useNavigate();
    const params=useParams(); 
     const [user,setUser]=useState(null)
    const [load, setLoad] = React.useState(true)
    const [data, setData] = useState(null)
    const [message, setMessage]=useState(null)

    
        const CartAddHandler=async()=>{
            if( !user){
                    window.alert("Login/SignUp Required");
                    // navigate('/login')
                    navigate('/login', { state: { productId:parseInt(params.productId)} });
            }else{
               try{
                const cartRef=doc(db,"cart",user.uid)
                const cartdata= await getDoc(cartRef);
                console.log(cartdata.data());
                const Products=cartdata.data()?cartdata.data().Products:[];
                const id=parseInt(params.productId)
    
        for (var i = 0; i < Products.length; i++){
            if (Products[i].p === id){
            setMessage("Item already present in cart")
            setTimeout(() => {
                setMessage(null);
              }, "2000")
                console.log("item alredy in cart");
                return;
            } 
        }

        Products.push({"p":id,"q":1})
        setDoc( cartRef,{Products})
        console.log(Products)
        console.log(user)
        setMessage("Item added to cart")
            setTimeout(() => {
                setMessage(null);
              }, "2000")


               }catch(e){
                console.log(e);
               }
    
            }
        }
    
    
    useEffect(()=>{

        setLoad(true)
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setUser(user);
        });
        const getData= async() =>{
            await fetch(`https://fakestoreapi.com/products/${params.productId}`).then((res) => res.json()).then((json) => {
                // console.log(json)
                setData(json)})
                
        }
        
        getData();
        setLoad(false)
        return () => {
          unsubscribe();
        };


    },[user])
    
  return (
       <>
       {load  && <Spinner1/>}
      {!load &&

      (data && <div>
        <div className='d-flex' >
    <div className='itemDetail'>
    <img className='productImage' src={data.image} alt="" />
    </div>
    <div className='itemDetail'>
        <h1>
       { data.title}
        </h1>
        <h5 className='m-2'>
       { data.description}
        </h5>
        <div className='m-2'>
          Price: ${data.price}
        </div>
        {message && <p style={{color:"green"}}>{message}</p>}
        <button className='m-2' onClick={CartAddHandler}>Add to Cart</button>
    </div>
    </div>
    <div className='mob-item' >
    <div >
        <h1>
       { data.title}
        </h1>
        <div style={{display:"flex"}}>
    <img className='mob-img' src={data.image} alt="" />
    </div>
        <p className='m-2'>
       { data.description}
        </p>
        <h6 style={{textWeight:"bold"}} className='m-2'>
          Price: ${data.price}
        </h6>
        {message && <p style={{color:"green"}}>{message}</p>}
        <button className='m-2' onClick={CartAddHandler}>Add to Cart</button>
    </div>
    </div>

      </div>
    )
    }
       </>
) 
  
   }
export default ItemPage