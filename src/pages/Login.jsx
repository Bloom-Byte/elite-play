import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and include at least one number and one special character.');
      return;
    }

    try {
      const response = await axios.post('https://be.eliteplay.bloombyte.dev/user/auth/login', {
        email,
        password,
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      navigate('/');
    } catch (error) {
      setError(error.response.data.error);
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
            <h4>Sign In</h4>
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
                  placeholder="Email Address"
                  value={email}
                  onChange={handleEmailChange}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
              </div>
              <div className="register-form__input-box">
                <img
                  className="input-icon"
                  src={
                    !passwordFocused && password
                      ? './lock-key-white.svg'
                      : './lock-key.svg'
                  }
                  alt="password-icon"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
              </div>
              <div className="login-form__forgot-password">
                <a href="/forgot-password">Forgot Password?</a>
              </div>
              <button className="register-form__submit-btn" type="submit">
                Sign In
              </button>
            </form>
            {error && <p className='error-msg'>{error}</p>}
            <div className="register-form__signin">
              <p>
                New to eliteplay? <a href="/register">Sign Up</a>
              </p>
            </div>
            <div className="register-form__option-box">
              <p className="register-form__option">or</p>
            </div>

            <div className="register-form__google-signin">
              <img src="./google.svg" alt="google-icon" />
              <span>Sign In with google</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
