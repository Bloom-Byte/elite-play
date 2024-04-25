import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

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
    setIsLoading(true);

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and include at least one number and one special character.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`https://be.eliteplay.bloombyte.dev/user/auth/reset-password/${token}`, {
        password,
        token
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      navigate('/login');
    } catch (error) {
      setError(error.response.data.error);
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
            <h4>Reset Password</h4>
          </div>
          <div className="register-form__form">
            <form className="register-form__form-input" onSubmit={handleSubmit}>
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
                  placeholder="New Password"
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
              </div>
              <button className="register-form__submit-btn" type="submit">
              {isLoading ? <div class="lds-ring"><div></div><div></div><div></div><div></div></div> : 'Reset Password'}
              </button>
              {error && <p className='error-msg'>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
