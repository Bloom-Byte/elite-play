import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import instance from '../utils/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    try {
      await instance.post('/user/auth/forgot-password', {
        email,
      });

      setMessage('Reset Email Sent successfully and token will expire in 10 MINS');
    } catch (error) {
      setError(error.response.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mobile-auth">
      <div className="register">
        <div className="register-logo">
          <img src="./auth-img.png" alt="logo" />
        </div>
        <div className="register-form">
          <div className="register-form__heading">
            <h4>Forgot Password</h4>
          </div>
          <div className="register-form__form">
            <form className="register-form__form-input" onSubmit={handleSubmit}>
              <div className="register-form__input-box">
                <img
                  className="input-icon"
                  src={
                    !emailFocused && email
                      ? './mail-white.svg'
                      : './mail-02.svg'
                  }
                  alt="email-icon"
                />
                <input
                  type="email"
                  placeholder="Enter Email Address to get Reset Link"
                  value={email}
                  onChange={handleEmailChange}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
              </div>
              {error && <p className='error-msg'>{error}</p>}
              {message && <p className='success-msg'>{message}</p>}

              <button className="register-form__submit-btn" type="submit">
                {isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : 'Reset Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
