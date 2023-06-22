import React from 'react'
import Sidemenu from '../components/Sidemenu'
import Posts from '../components/Posts'
import Spinner from '../components/Spinner'
const HomePage = () => {
  return (
      <>
   <div className='main'>
     <Sidemenu></Sidemenu>
   <Posts></Posts>
  
  </div>
      </>

  )
}

export default HomePage