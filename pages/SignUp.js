import React from 'react'
import { useAuth } from '../config/AuthContext';

const SignUp = () => {

  const {user, logIn, logOut} = useAuth();

  const handleRightSide = () => {
    var form = document.getElementById('form_Container')
    form.style.display = 'flex';
  }

  return (
    <div className="SignUp__content">
        <div className="SignUp__container">
            <div className="SignUp__confirm">
                <img src="/images/img_1.svg"  alt="" />
                <h1>A safe place for you to control your finance</h1>
                <p>By continuing the create account setup,
                you agree to our terms & 
                conditions and you also agree that we 
                can send you personalized newsletters.</p>
                <div className="confirm__arrow">
                    <a href="/">Back</a>
                    <button onClick={handleRightSide} type="button"><i className="pi pi-arrow-right"></i></button>
                </div>
            </div>
            <div className="form__Container" id="form_Container">
            <div className="SignUp__form">
                <img src="/images/img_2.svg" alt="" />
                <h1>Let's get Stated</h1>
                <form className="form__SignUp">
                  <div className="input_field">
                    <i className="pi pi-at"></i>
                    <input type="text" placeholder="Email Address" />
                  </div>
                  <div className="input_field">
                    <i className="pi pi-lock"></i>
                    <input type="password" placeholder="Password" />
                  </div>
                  <button type="submit" >Create Account </button>
                </form>


                <div className="google_SignUp" onClick={logIn}>
                  <img src="/images/google_logo.png" alt="" />
                  <p>Sign Up with Google</p>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp