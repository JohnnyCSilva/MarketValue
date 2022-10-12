import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../config/Firebase'
import {useAuthValue} from '../../config/AuthContext'
import SectionDashboard from './SectionDashboard';


const ContentMain = () => {

  const signUserOut = async() => {
    signOut(auth);
    toast.current.show({ severity: 'info', summary: 'You were logged out!', detail: 'Your account has been logged out! We are redirecting you.', life: 4000 });
    await delay(4000);
    window.location = '/';
  }

  const {currentUser} = useAuthValue()
  console.log(currentUser);

  return (
    <div className="dashboard__main__content">
        <h2> Welcome {currentUser?.email}</h2>
        <button onClick={signUserOut}>Sign Out</button>

        <SectionDashboard/>

    </div>
  )
}

export default ContentMain