import React from 'react'
import './Register.css'

const Register = () => {
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
              <img className="input-icon" src="./user.svg" alt="user-icon" />
              <input type="text" placeholder="Username" />
            </div>
            <div className="register-form__input-box">
              <img
                className="input-icon"
                src="./mail-02.svg"
                alt="email-icon"
              />
              <input type="email" placeholder="Email Address" />
            </div>
            <div className="register-form__input-box">
              <img
                className="input-icon"
                src="./lock-key.svg"
                alt="password-icon"
              />
              <input type="password" placeholder="Password" />
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
