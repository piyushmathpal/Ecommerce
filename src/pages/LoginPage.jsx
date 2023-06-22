
import React, {useState} from 'react';
import { NavLink, useNavigate,useLocation } from 'react-router-dom';
import {signInWithEmailAndPassword  } from 'firebase/auth';
import { auth ,signInWithGoogle} from '../config/firebase';

 
const LoginPage = () => {


    const navigate = useNavigate();
    const {state} = useLocation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error,setError]=useState(null)
   console.log(state)
   let productId=null
   if(state)
   {
     productId = state.productId;
   }
 
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            if(state){
                navigate(`/item/${productId}`)
            }
           else navigate('/')
            // ...
        })
        .catch((error) => {
            console.log(error)
            const errorCode = error.code;
            const errorMessage = error.message;
            setError("Invalid Email or Password")
            setTimeout(() => {
                setError(null);
              }, "3000")
            console.log(errorCode," 11", errorMessage);
            // ..
        });
 
   
    }
    const swg=async()=>{
        await signInWithGoogle()
        if(state){
            navigate(`/item/${productId}`)
        }
       else navigate('/')

    }
    const swp=async()=>{
        navigate('/signup/phonenumber')
        

    }
 
  return (
    <main >        
        <section>
            <div>
                <div className='formbox'>                                                                                           
                    <form  >                                                <h1 >Log In</h1>      
                        <div className="form-group mb-3">
                            <label htmlFor="email-address">
                                Email address
                            </label>
                            <input
                                type="email"
                                label="Email address"
                                value={email}
                                className="form-control" 
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="Email address"                                
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                label="Create password"
                                className="form-control" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Password"              
                            />
                        </div>    
                                                            
                        
                        <button
                            type="submit" 
                            className="btn btn-primary"
                            onClick={onSubmit}                        
                        >  
                          Log In                                
                        </button>

                        { error?(<p style={{color:"red"}}>{error}</p>):(<><br/> <br/></>)}   
                    </form>
                        <center>or</center>
                        <center><button style={{margin:"10px"}} onClick={swg}> <svg  style={{width:"30px",paddingRight:'10px'}} xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="google"><path fill="#6563FF" d="M22.60229,10.00391a1.00005,1.00005,0,0,0-.98388-.82227H12.2a.99974.99974,0,0,0-1,1V14.0498a.99974.99974,0,0,0,1,1h3.9624a3.65162,3.65162,0,0,1-1.13183,1.1875A5.0604,5.0604,0,0,1,12.2,17.02246a4.93525,4.93525,0,0,1-4.64624-3.4378L7.55347,13.583a4.90382,4.90382,0,0,1,0-3.167l.00024-.00165A4.9356,4.9356,0,0,1,12.2,6.97754,4.37756,4.37756,0,0,1,15.3313,8.19531a1.00053,1.00053,0,0,0,1.39844-.01562L19.5979,5.31152a.99918.99918,0,0,0-.02539-1.43847A10.62342,10.62342,0,0,0,12.2,1,10.949,10.949,0,0,0,2.37134,7.05878l-.00147.00177A10.92175,10.92175,0,0,0,1.2,12a11.07862,11.07862,0,0,0,1.16992,4.93945l.00147.00177A10.949,10.949,0,0,0,12.2,23a10.5255,10.5255,0,0,0,7.29468-2.687l.00073-.00049.00079-.00085.00019-.00013.00006-.00012a10.78575,10.78575,0,0,0,3.30365-8.08386A12.51533,12.51533,0,0,0,22.60229,10.00391ZM12.2,3a8.68219,8.68219,0,0,1,5.2085,1.67285L15.95483,6.126A6.46322,6.46322,0,0,0,12.2,4.97754,6.88648,6.88648,0,0,0,6.21069,8.52832L5.14148,7.69958l-.585-.45367A8.95257,8.95257,0,0,1,12.2,3ZM3.67944,14.90332a9.02957,9.02957,0,0,1,0-5.80664l1.78223,1.38184a6.85381,6.85381,0,0,0,0,3.042ZM12.2,21A8.9528,8.9528,0,0,1,4.5564,16.75391l.37841-.29352,1.27588-.98969A6.88482,6.88482,0,0,0,12.2,19.02246a7.27662,7.27662,0,0,0,3.30573-.75079L17.19739,19.585A8.88989,8.88989,0,0,1,12.2,21Zm6.52588-2.76074-.183-.142L17.16553,17.028a5.60626,5.60626,0,0,0,1.39966-2.79553.9998.9998,0,0,0-.9834-1.18262H13.2V11.18164h7.54883c.03418.3457.05127.69531.05127,1.0459A9.05156,9.05156,0,0,1,18.72583,18.23926Z"></path></svg>Continue With Google</button></center>
<center><button  style={{margin:"10px"}} onClick={swp}> <svg style={{width:"30px",paddingRight:'10px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="phone"><path fill="#6563FF" d="M19.44,13c-.22,0-.45-.07-.67-.12a9.44,9.44,0,0,1-1.31-.39,2,2,0,0,0-2.48,1l-.22.45a12.18,12.18,0,0,1-2.66-2,12.18,12.18,0,0,1-2-2.66L10.52,9a2,2,0,0,0,1-2.48,10.33,10.33,0,0,1-.39-1.31c-.05-.22-.09-.45-.12-.68a3,3,0,0,0-3-2.49h-3a3,3,0,0,0-3,3.41A19,19,0,0,0,18.53,21.91l.38,0a3,3,0,0,0,2-.76,3,3,0,0,0,1-2.25v-3A3,3,0,0,0,19.44,13Zm.5,6a1,1,0,0,1-.34.75,1.05,1.05,0,0,1-.82.25A17,17,0,0,1,4.07,5.22a1.09,1.09,0,0,1,.25-.82,1,1,0,0,1,.75-.34h3a1,1,0,0,1,1,.79q.06.41.15.81a11.12,11.12,0,0,0,.46,1.55l-1.4.65a1,1,0,0,0-.49,1.33,14.49,14.49,0,0,0,7,7,1,1,0,0,0,.76,0,1,1,0,0,0,.57-.52l.62-1.4a13.69,13.69,0,0,0,1.58.46q.4.09.81.15a1,1,0,0,1,.79,1Z"></path></svg>
Continue With Phone Number</button></center>


                    
                   <br/>
                   <center>

                    <p >
                      New to E-Shop? Create an account:
                        <NavLink to="/signup" >
                            Sign Up
                        </NavLink>
                    </p>                   
                   </center>
                </div>
            </div>
        </section>
    </main>
  )
}
 
export default LoginPage