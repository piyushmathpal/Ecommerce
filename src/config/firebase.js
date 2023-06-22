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
  apiKey: "AIzaSyDuPMui82IMnfw2EbLwRutd2HPhf4fTym4",
  authDomain: "ecommerce-648c6.firebaseapp.com",
  projectId: "ecommerce-648c6",
  storageBucket: "ecommerce-648c6.appspot.com",
  messagingSenderId: "803766163424",
  appId: "1:803766163424:web:47c2bf3c786ea1edc5bd85",
  measurementId: "G-HH9VSFV98Q"
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
 

