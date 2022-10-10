import React, { useState, useContext } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';


const SignUp = () => {

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

  const [registerEmail, setRegisterEmail] = useState();
  const [registerPassword, setRegisterPassword] = useState();

  const registerUser = async(e) => {
    e.preventDefault();
    try {
      createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
    } catch (error) {
      console.log(error.message);
    }
    window.location = '/Dashboard';
    username = registerEmail;
    user = registerEmail;
  }

  return (
    <div className="main__signUp">

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
            <form onSubmit={registerUser}>
              <label>Username</label>
              <div className='signUp__input'>
                <i className="pi pi-user" />
                <input type="text" name="Name" placeholder="Name" required/>
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