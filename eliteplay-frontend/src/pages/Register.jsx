import React, { useState } from 'react'
import './Register.css'

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


  return (
    <div className="register">
      <div className="register-logo">
        <img src="./auth-img.png" alt="logo" />
      </div>
      <div className="register-form">
        <div className="register-form__heading">
          <h4>Sign Up</h4>
        </div>
        <div className="register-form__form">
          <form className="register-form__form-input" action="">
            <div className="register-form__input-box">
              <img className="input-icon" src={!usernameFocused && username ? "./user-white.svg" : "./user.svg"} alt="user-icon" />
              <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} onFocus={() => setUsernameFocused(true)} onBlur={() => setUsernameFocused(false)}/>
            </div>
            <div className="register-form__input-box">
              <img
                className="input-icon"
                src={!emailFocused && email ? "./mail-white.svg" : "./mail-02.svg"}
                alt="email-icon"
              />
              <input type="email" placeholder="Email Address" value={email} onChange={handleEmailChange} onFocus={() => setEmailFocused(true)} onBlur={() => setEmailFocused(false)} />
            </div>
            <div className="register-form__input-box">
              <img
                className="input-icon"
                src={!passwordFocused && password ? "./lock-key-white.svg" : "./lock-key.svg"}
                alt="password-icon"
              />
              <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} onFocus={() => setPasswordFocused(true)} onBlur={() => setPasswordFocused(false)} />
            </div>
            <div className="register-form__check-box">
              <label class="container">
              I agree to the User Agreement & confirm I am at least 18 years old
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
            </div>
            <button className="register-form__submit-btn" type="submit"> Sign Up Now </button>
          </form>
          <div className='register-form__signin'>
            <p>Already have an account? <a href="/login">Sign In</a></p>
          </div>
          <div className='register-form__option-box'>
            <p className='register-form__option'>or</p>
          </div>
          
          <div className='register-form__google-signin'>
            <img src="./google.svg" alt="google-icon" />
            <span>Sign Up with google</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
