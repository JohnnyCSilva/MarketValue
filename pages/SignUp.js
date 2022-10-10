import React, { useState, useRef } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/Firebase'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Toast } from 'primereact/toast';

const SignUp = () => {

  const [registerUsername, setUsername] = useState();
  const [registerEmail, setRegisterEmail] = useState();
  const [registerPassword, setRegisterPassword] = useState();
  const toast = useRef(null) ;

  const delay = ms => new Promise(res => setTimeout(res, ms));


  const verifyUsersRegisted = async(e) => {
    (e).preventDefault();

    const usersRef = doc(db, "users", registerEmail);
    
    const data = {
      username: registerUsername,
      email: registerEmail,
    }

    const userExists = await getDoc(usersRef);

    if (userExists.exists()){

      toast.current.show({ severity: 'error', summary: 'Email Already in Use', detail: 'The email is already in use, please a diferent email or contact support for more information.', life: 3000 });

    } else {
      setDoc(usersRef, data);
      createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      toast.current.show({ severity: 'success', summary: 'Account Created Successfully', detail: 'Account Created Successfully, we are redirecting you!', life: 4000 });
      await delay(4000);
      window.location = '/Dashboard';
    }
  }

  const showPassword = () => {
    var password = document.getElementById('password');
    var icon = document.getElementById('show__password');

    if (password.type === "password") {
      icon.classList.remove('pi-lock');
      icon.classList.add('pi-unlock');
      password.type = "text";
    } else {
      icon.classList.remove('pi-unlock');
      icon.classList.add('pi-lock');
      password.type = "password";
    }
  }

  return (
    <div className="main__signUp">

      <Toast ref={toast} position="bottom-left" baseZIndex="1000"/>

      <div className="container__signUn__left">
        <div className="signUp__form__total">
          <div className="signUp__Title">
            <h1>Sign Up </h1>
            <p>See your growth and get consulting support!</p>
          </div>
          <div className='signUp__buttons'>
            <div className="google">
              <img src="/images/google_logo.png" alt="GoogleAuthProvider" />
              <p> Sign up with Google</p>
            </div>
          </div>
          <div className="separator">
            <span>or Sign in with Email</span>
          </div>
          <div className='signUp__form'>
            <form onSubmit={verifyUsersRegisted}>
              <label>Username</label>
              <div className='signUp__input'>
                <i className="pi pi-user" />
                <input type="text" name="Name" placeholder="Name" required onChange={(event) => { setUsername(event.target.value)} }/>
              </div>
              <label>Email</label>
              <div className='signUp__input'>
                <i className="pi pi-at" />
                <input type="email" name="Email" placeholder="Email" required onChange={(event) => { setRegisterEmail(event.target.value)} }/>
              </div>
              <label>Password</label>
              <div className='signUp__input'>
                <i className="pi pi-lock" id="show__password" onClick={showPassword}/>
                <input type="password" name="Password" id="password" placeholder="Password" required onChange={(event) => { setRegisterPassword(event.target.value)} }/>
              </div>
              <button type="submit" className="btn__submit" >Create Account</button>
            </form>
          </div>
          <div className="signUp__after">
            <p> Already have an account? <a href="/SignIn">Sign In</a></p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SignUp