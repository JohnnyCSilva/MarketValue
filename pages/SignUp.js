import React from 'react'
import { useAuth } from '../config/AuthContext';

const SignUp = () => {

  const {user, logIn, logOut} = useAuth();

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
      <div className="container__signUn__left">
        <div className="signUp__form__total">
          <div className="signUp__Title">
            <h1>Sign Up </h1>
            <p>See your growth and get consulting support!</p>
          </div>
          <div className='signUp__buttons'>
            <a href="/" onClick={logIn}>
              <img src="/images/google_logo.png" alt="GoogleAuthProvider" />
              <p> Sign up with Google</p>
            </a>
          </div>
          <div class="separator">
            <span>or Sign in with Email</span>
          </div>
          <div className='signUp__form'>
            <form>
              <label>Username</label>
              <div className='signUp__input'>
                <i className="pi pi-user" />
                <input type="text" name="Name" placeholder="Name" required/>
              </div>
              <label>Email</label>
              <div className='signUp__input'>
                <i className="pi pi-at" />
                <input type="email" name="Email" placeholder="Email" required/>
              </div>
              <label>Password</label>
              <div className='signUp__input'>
                <i className="pi pi-lock" id="show__password" onClick={showPassword}/>
                <input type="password" name="Password" id="password" placeholder="Password" required/>
              </div>
              <button type="submit" className="btn__submit">Create Account</button>
            </form>
          </div>
          <div className="signUp__after">
            <p> Already have an account? <a href="/">Sign In</a></p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SignUp