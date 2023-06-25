// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider,getAuth,signInWithPopup,signInWithEmailAndPassword,createUserWithEmailAndPassword,
sendPasswordResetEmail,signOut,signInWithPhoneNumber,RecaptchaVerifier} from 'firebase/auth'
import { getFirestore, query,getDocs,collection,where,addDoc} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain:process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID ,
  storageBucket:process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId:process.env.REACT_APP_MESSAGINGSENDERID,
  appId:process.env.REACT_APP_APPID,
  measurementId:process.env.REACT_APP_MEASURMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
auth.languageCode = 'en';
export const googleProvider=new GoogleAuthProvider();

export const db=getFirestore(app);
export const signInWithGoogle = async () => {

try {
  const res = await signInWithPopup(auth, googleProvider);
  const user = res.user;
  console.log(user)
  
  
} catch (err) {
  console.error(err);
  alert(err.message);
}
}
 

