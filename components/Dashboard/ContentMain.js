import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../config/Firebase'
import {useAuthValue} from '../../config/AuthContext'



const ContentMain = () => {

  const signOutGoogle = () => {
    signOut(auth).then(() => {
      console.log("success");
    }).catch((err) => {
      console.log(err.message);
    });
  }

  const {currentUser} = useAuthValue()


  

  return (
    <div>
        <h2> Welcome {currentUser?.email}</h2>
        <button onClick={signOutGoogle}>Sign Out</button>
    </div>
  )
}

export default ContentMain