import React, { useState, useRef } from 'react'
import { signInWithEmailAndPassword,} from 'firebase/auth';
import { auth, db, googleSignIn } from '../config/Firebase'
import { Toast } from 'primereact/toast';
import { useAuthValue } from "../config/AuthContext"


const SignIn = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const toast = useRef(null) ;

  const delay = ms => new Promise(res => setTimeout(res, ms));

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

  const login = async(e) => {
    (e).preventDefault()
    signInWithEmailAndPassword(auth, email, password);
    toast.current.show({ severity: 'success', summary: 'Login Successfully!', detail: 'Account Reached! We are now redirecting you!', life: 4000 });
    await delay(4000);
    window.location = '/Dashboard';

    //   toast.current.show({ severity: 'error', summary: 'Account not Created!', detail: 'This email does not exist in our database. Please create a new account.', life: 3000 });
  }
  

  function childOfAuthProvider(){
    const {currentUser} = useAuthValue()
    console.log(currentUser)
  }


  return (
    <div className="main__signUp">

      <Toast ref={toast} position="bottom-left" baseZIndex="1000"/>

      <div className="container__signUn__left">
        <div className="signUp__form__total">
          <div className="signUp__Title">
            <h1>Sign In </h1>
            <p>Login into your account to manage your Portfolio</p>
          </div>
          <div className='signUp__buttons'>
            <div className="google"  onClick={googleSignIn}>
              <img src="/images/google_logo.png" alt="GoogleAuthProvider" />
              <p> Sign In with Google</p>
            </div>
          </div>
          <div className="separator">
            <span>or Sign in with Email</span>
          </div>
          <div className='signUp__form'>
            <form onSubmit={login}>
              <label>Email</label>
              <div className='signUp__input'>
                <i className="pi pi-at" />
                <input type="email" name="Email" placeholder="Email" required onChange={(event) => { setEmail(event.target.value)} }/>
              </div>
              <label>Password</label>
              <div className='signUp__input'>
                <i className="pi pi-lock" id="show__password" onClick={showPassword}/>
                <input type="password" name="Password" id="password" placeholder="Password" required onChange={(event) => { setPassword(event.target.value)} }/>
              </div>
              <button type="submit" className="btn__submit" >Login</button>
            </form>
          </div>
          <div className="signUp__after">
            <p> Dont have an account? <a href="/SignUp">Sign Up</a></p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SignIn