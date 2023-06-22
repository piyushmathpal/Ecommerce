import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import { getDoc, doc, setDoc,deleteDoc } from "firebase/firestore";
import CartItem from "../components/CartItem";
import { Spinner } from "react-bootstrap";
import {auth} from '../config/firebase'
import { withFirestore, isLoaded } from 'react-redux-firebase';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const CartPage = () => {
  const [product, setProduct] = useState([]);
  const [load, setLoad] = useState(true);
  const [user,setUser]=useState(null)
  const [total, setTotal] = useState(0);
  const [datas, setDatas] = useState([]);
  const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let data = [];
  let Products = [];
  console.log(user)
  console.log(isLoaded(auth))
  const onBuyNow=async()=>{
    await deleteDoc(doc(db, "cart", user.uid));
    setDatas([])
    handleShow();
    
  }
  useEffect(() => {
    setLoad(true);
    // auth.onAuthStateChanged((user1) => {
    //   if (user1) {
    //     setUser(user1)
    //   }
  
    // });
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    if(user){
      const getData = async () => {
        try {
            console.log(auth.currentUser)
            const cartRef = doc(db, "cart", user.uid);
            const cartdata = await getDoc(cartRef);
            Products = cartdata.data() ? cartdata.data().Products : [];
            console.log(Products);
  
            await fetch("https://fakestoreapi.com/products/")
              .then((res) => res.json())
              .then((json) => {
                data = json;
              });
            let result = [];
            for (let i = 0; i < Products.length; i++) {
              for (let j = 0; j < data.length; j++) {
                if (data[j].id === Products[i].p) {
                  result.push(data[j]);
                }
              }
            }
            console.log(result);
            setDatas(result);
            setProduct(Products);
            setLoad(false);
          } catch (err) {
            console.log(err);
          }
      
      };
      getData();

    }
    return () => {
      unsubscribe();
    };

  
   
 
  }, [user]);

  const ProductHandler=(arg)=>{
    if(arg){
      console.log(arg)
         let result = [];
          for (let i = 0; i < arg.length; i++) {
            for (let j = 0; j < datas.length; j++) {
              if (datas[j].id === arg[i].p) {
                result.push(datas[j]);
              }
            }
          }
          setProduct(arg);
          setDatas(result);
    }
  }

  const renderProducts = () => {
    console.log(product);
    return product.map((item, idx) => (
      <CartItem
        key={idx}
        item={datas[idx]}
        idx={idx}
        product={product}
        uid={user.uid}
        setProduct={ProductHandler}
        total={total}
        setTotal={setTotal}
      />
    ));
  };
  console.log(datas);
if (!isLoaded(auth)) {
    return (<Spinner />);
  }
if(user){
    return (
      <>
        <div className="cart-page" style={{backgroundColor: "#f8f8f8"}}>

          {load && <center><Spinner style={{textAlign:"center",margin:"25px"}} /></center>}
  
          {!load &&  datas.length !== 0 &&
          <div>
            <center><h1>Your Cart</h1></center>

          <div className="cart-pagedisplay">

           <div className="cart-items ">
              {renderProducts()}
            </div>
            <div className="m-5">
            <center> <h1>Total :${total}</h1>
             <button onClick={onBuyNow} className="buy-button">Buy Now</button> </center>
            </div>
            </div>
          </div>
          }
          {!load && user && datas.length === 0 &&<div style={{textAlign:"center"}}>

          <h4 style={{textAlign:"center",margin:"25px"}}> Your cart is empty!</h4>
            <Link to='/'><button>Add items to your cart</button></Link>
  
          </div>
          }
          </div> 
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Your order has been successfully placed. </Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>
        Your order has been successfully placed. 
        </Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
      </>
    );
  }
  
  else
  {
     return(<>
   <div style={{textAlign:"center"}}>

   <h4 style={{textAlign:"center",margin:"25px"}}> Login required!</h4>
            <Link to='/login'><button>click here to login</button></Link>
     
   </div>
    </>)
  }


  
};
export default CartPage;
