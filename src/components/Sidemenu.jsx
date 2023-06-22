import React,{useContext} from 'react'
import styles from './Sidemenu.module.css'
import FilterContext from '../context/filter'

const Sidemenu = () => {
 const filter = useContext(FilterContext);
 console.log(filter.state["filter"]);

const changeHandler=(e)=>{
    filter.updateFilter(e.target.value);

}

    return (
    
   <div className={styles.sidemenu}>
   <p className='text-center'>Categories:</p>
  <input type="radio" id="All" name="category" value="All" onChange={changeHandler} ></input>
  <label htmlFor="All">All</label><br/>
  <input type="radio" id="men's clothing" name="category" value="men's clothing" onChange={changeHandler}></input>
  <label htmlFor="men's clothing">men's clothing</label><br/>
  <input type="radio" id="jewelery" name="category" value="jewelery" onChange={changeHandler}></input>
  <label htmlFor="jewelery">jewelery</label><br/>
  <input type="radio" id="electronics" name="category" value="electronics" onChange={changeHandler}></input>
  <label htmlFor="electronics">electronics</label><br/>
  <input type="radio" id="women's clothing" name="category" value="women's clothing"onChange={changeHandler}></input>
  <label htmlFor="women's clothing">women's clothing</label>
   </div>

  )
}

export default Sidemenu