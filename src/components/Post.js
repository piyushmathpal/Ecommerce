import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from "./Post.module.css";
import { useNavigate} from 'react-router-dom';

import React from 'react'

const Post = (props) => {
  const navigate = useNavigate();

  const clickHandler=()=>{
    console.log("clicked");
    navigate(`item/${props.e.id}`)
  }
  
    // console.log(props.e.category)
    return (
        <div className='products'  onClick={clickHandler}>
          <Card.Img className={styles.img} variant="top" src={props.e.image} />
          <Card.Body>
            <h5 style={{ wordWrap: "break-word"}}>{props.e.title}</h5>
            
            <Button variant="primary">${props.e.price}</Button>
          </Card.Body>
        </div>
      );
    }
 
export default Post;