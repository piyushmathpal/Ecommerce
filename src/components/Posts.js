import React,{useEffect,useContext} from 'react'
import Post from './Post'


import FilterContext from '../context/filter'
import Spinner1 from './Spinner'

const Posts = () => {
    const filter = useContext(FilterContext);
    const radio= filter.state["filter"];

    const [data, setData] = React.useState(null)
    const [load, setLoad] = React.useState(true)
         useEffect(() =>{
            
            const getData= async() =>{
              setLoad(true)
              if(radio==="All"){
                 await fetch("https://fakestoreapi.com/products/").then((res) => res.json())
                  .then((json) => {
                    setData(json)})
              }else if(radio==="electronics"){
                await fetch("https://fakestoreapi.com/products/category/electronics").then((res) => res.json())
                .then((json) => {
                  setData(json)})
              }else if(radio==="jewelery"){
                await fetch("https://fakestoreapi.com/products/category/jewelery").then((res) => res.json())
                .then((json) => {
                  setData(json)})
              }else if(radio==="men's clothing"){
                 await fetch("https://fakestoreapi.com/products/category/men's clothing").then((res) => res.json())
                .then((json) => {
                  setData(json)})
              }else{
                 await fetch("https://fakestoreapi.com/products/category/women's clothing").then((res) => res.json())
                .then((json) => {
                  setData(json)})
              }
              setLoad(false)
          }
          getData();
          },[radio]);
      

  return (
    <>
    <div>

    {load&&<Spinner1/>}
    {!load &&<center><div className='d-flex flex-wrap justify-content-around d-inline-block'>
    
    

    {data && data.length >0 && data.map((e,i) =>{
      return <Post key={i} e={e}></Post>
    })}
    </div>
    </center>
    }
    </div>
   
    
    </>
  )
}

export default Posts