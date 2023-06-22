import React, { useState } from 'react'
import {auth,appVerifier} from '../config/firebase'
import {  getAuth, signInWithPhoneNumber,RecaptchaVerifier  } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
const PhoneNumber = () => {
    const[num,setNum]=useState("null")
    const[otp,setOtp]=useState("null")
    const [user, setUser] = useState(null);
    const [showOTP, setShowOTP] = useState(false);
    const [message, setMessage]=useState(null)
    const [error1,setError1]=useState(null)
    const [loading,setLoading]=useState(null)

    const navigate = useNavigate();
    const onCaptchVerify = async ()=> {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "invisible",
              callback: (response) => {
                // onSignup();
              },
              "expired-callback": () => {console.log("exp")},
            },
            auth
          );
    }
      }
    
      const onSignup = async() =>{
        if(num.length!==10)
        {
          setError1("Enter Valid 10 digit number")
          setTimeout(() => {
                setError1(null);
              }, "3000")
              return;
        }
        await onCaptchVerify();
       try{
        setLoading(true)
        const appVerifier = window.recaptchaVerifier;
        console.log(loading)
    
        const formatPh = "+91" + num;
        
        console.log(formatPh)
    
        await signInWithPhoneNumber(auth, formatPh,appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setShowOTP(true);
            setMessage("OTP sent successfully")
            setTimeout(() => {
                setMessage(null);
              }, "2000")
            console.log("OTP sended successfully!");
          })
          .catch((error) => {
            console.log(error);
         
          });
          setLoading(false)
        }catch(err){
          console.log(err)
          setLoading(false)
        }
      }
      function onOTPVerify() {
        window.confirmationResult
          .confirm(otp)
          .then(async (res) => {
            console.log(res);
            setUser(res.user);
            window.recaptchaVerifier=null
            navigate('/')
          })
          .catch((err) => {
            console.log(err);
            // setLoading(false);
          });
      }
  return (
    <div  className='formbox'>
        
         <div  className="form-group mb-3">
            <h2>Continue With Phone Number</h2>
                            <label htmlFor="number">
                                 Enter Phone Number
                            </label>
                            <input
                                type="text"
                                label="number"
                                className="form-control" 
                                onChange={(e) =>{ setNum(e.target.value);setShowOTP(false)}}  
                                required                                    
                                placeholder="PhoneNumber"
                                onKeyUp={async (e) =>{
                                  if(e.key == 'Enter'){
                                    await onSignup()
                                  }
                                }}     
                                maxLength={10} 
                                // 1 == '1' true
                                // 1 === '1' false                      
                            />
                            <div id='recaptcha-container'></div>
                             <button 
                             style={{margin:"10px"}}
                            type="text" 
                            id='sign-in-button'
                            className="btn btn-primary"
                            disabled={loading}
                            onClick={async() =>await onSignup()}                        
                        >{ loading?("Loading"):("Send OTP")}</button>
                        {error1 && <p style={{color:"red"}}>{error1}</p>}
                        {message && <p style={{color:"green"}}>{message}</p>}
                            </div>
                           {showOTP && <div className="form-group mb-3">
                            <label htmlFor="OTP">
                                 Enter Phone Number
                            </label>
                            <input
                                type="text"
                                label="OTP"
                                className="form-control" 
                                onChange={(e) => {setOtp(e.target.value);}}  
                                required                                    
                                placeholder="OTP"                                
                            />
                             <button
                             style={{margin:"10px"}}
                            type="submit" 
                            className="btn btn-primary"
                            onClick={onOTPVerify}                        
                          >Verify OTP</button>
                            </div>}

    </div>
  )
}

export default PhoneNumber