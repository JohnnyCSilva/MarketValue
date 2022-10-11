import React, { useState, useRef } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Firebase'
import { Toast } from 'primereact/toast';

const SignUp = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const toast = useRef(null) ;

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
      }
    }
    return isValid
  }

  const register = async(e) => {
    (e).preventDefault()
    if(validatePassword()) {
      // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
            console.log(res.user)
          })
        .catch(err => setError(err.message))
        toast.current.show({ severity: 'success', summary: 'Account Created Successfully', detail: 'Account Created Successfully, we are redirecting you to your dashboard!', life: 4000 });
        await delay(4000);
        window.location = '/Dashboard';
    } else {
      toast.current.show({ severity: 'error', summary: 'Passwords does not match', detail: 'Please re-enter your password or use a diferent one.', life: 3000 });

    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }
  
  const showPassword = () => {
    var Fpassword = document.getElementById('fpassword');
    var icon = document.getElementById('show__password');

    if (Fpassword.type === "password") {
      icon.classList.remove('pi-lock');
      icon.classList.add('pi-unlock');
      Fpassword.type = "text";
    } else {
      icon.classList.remove('pi-unlock');
      icon.classList.add('pi-lock');
      Fpassword.type = "password";
    }
  }
  const showConfirmPassword = () => {
    var Cpassword = document.getElementById('cpassword');
    var icon = document.getElementById('show__confirmpassword');

    if (Cpassword.type === "password") {
      icon.classList.remove('pi-lock');
      icon.classList.add('pi-unlock');
      Cpassword.type = "text";
    } else {
      icon.classList.remove('pi-unlock');
      icon.classList.add('pi-lock');
      Cpassword.type = "password";
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
            <form onSubmit={register}>
              <label>Email</label>
              <div className='signUp__input'>
                <i className="pi pi-at" />
                <input type="email" name="email" placeholder="Email" required onChange={(event) => { setEmail(event.target.value)} }/>
              </div>
              <label>Password</label>
              <div className='signUp__input'>
                <i className="pi pi-lock" id="show__password" onClick={showPassword}/>
                <input type="password" name="Password" placeholder="Password" id="fpassword" required onChange={(event) => { setPassword(event.target.value)} }/>
              </div>
              <label>Confirm Password</label>
              <div className='signUp__input'>
                <i className="pi pi-lock" id="show__confirmpassword" onClick={showConfirmPassword}/>
                <input type="password" name="ConfirmPassword" id="cpassword" placeholder="Confirm Password" required onChange={(event) => { setConfirmPassword(event.target.value)} }/>
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