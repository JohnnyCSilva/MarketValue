import React, { useState, useContext } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { UserContext } from '../config/context'
import { auth, googleAuthProvider } from '../config/Firebase';

const SignIn = () => {

  const { user, username } = useContext(UserContext)

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

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const registerUser = async(e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            console.log(error)
        });

    window.location = '/Dashboard';
    username = email;
    user = email;
  }

  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <div className="main__signUp">
      <div className="container__signUn__left">
        <div className="signUp__form__total">
          <div className="signUp__Title">
            <h1>Sign In </h1>
            <p>Login into your account to manage your Portfolio</p>
          </div>
          <div className='signUp__buttons'>
            <div className="google" href="" onClick={signInWithGoogle}>
              <img src="/images/google_logo.png" alt="GoogleAuthProvider" />
              <p> Sign In with Google</p>
            </div>
          </div>
          <div className="separator">
            <span>or Sign in with Email</span>
          </div>
          <div className='signUp__form'>
            <form onSubmit={registerUser}>
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
            <p> Dont have an account? <a href="/">Create Here</a></p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SignIn