import React, { useState } from 'react'
import { Checkbox } from "primereact/checkbox";

const Signin = () => {

    const [checked, setChecked] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



  return (
    <div className="signin__main">
        <div className="signin__container">
            <div className="signin__left">

                <h2> Create Account </h2>

                <div className="Social__login">
                    <div className="google-signin">
                        <i className="pi pi-google"></i>
                        <p>Google</p>
                    </div>
                    <div className="facebook-signin">
                        <i className="pi pi-facebook"></i>
                        <p>Facebook</p>
                    </div>
                </div>

        
                <form className="form__signIn"> 

                    <div className="form__field">
                        <i className="pi pi-user"/>
                        <input type="text" id="username" placeholder="username" 
                        onChange={(e) => setUsername(e.target.value)}/>
                    </div>

                    <div className="form__field">
                        <i className="pi pi-at"/>
                        <input type="email" id="email" placeholder="email" 
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>   

                    <div className="form__field">
                        <i className="pi pi-lock"/>
                        <input type="password" id="password" placeholder="password" 
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>   

                    <div className='checkBox__signIn'>
                        <Checkbox inputId="binary" checked={checked} onChange={(e) => setChecked(e.checked)} />
                        <label htmlFor="binary" className="labelCheck__signIn">Subscribe to MarketValue's Newsletter</label>
                    </div>
                    <button type='submit' className='btnSubmit__signin'>Create Account</button>
                </form>

                <h3 className="login__from__signin">I Already have an account. <a href="#">Sign In</a></h3>
                
            </div>
            <div className="signin__right">
                <img src="/images/right_side.svg" alt="side_right" />
            </div>
        </div>
    </div>
  )
}

export default Signin