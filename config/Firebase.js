import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup  } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const googleSignIn = () => {

  signInWithPopup(auth, provider)
    .then((result) => {

      console.log(" name: " + result.user.displayName + " email: " + result.user.email + " photoURL " + result.user.photoURL);
      window.location = '/Dashboard';
    }).catch((error) => {
      console.log(error);
    });
}




