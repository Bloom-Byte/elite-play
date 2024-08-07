import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './Login.css';
import instance from '../utils/api';
import { ACCESS_TOKEN } from '../utils/constants';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const [showPassword, setShowPassword] = useState(false);


  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
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

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await instance.post(`/user/auth/reset-password/${token}`, {
        newPassword: password,
        confirmPassword: confirmPassword
      });

      localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
      setSuccessMessage('Password reset successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
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
          <img src="/auth-img.png" alt="logo" />
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
                      ? '/lock-key-white.svg'
                      : '/lock-key.svg'
                  }
                  alt="password-icon"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <span className='addon' onClick={() => {
                  setShowPassword(!showPassword);
                }}>
                  {
                    showPassword ? <FiEyeOff /> : <FiEye />
                  }
                </span>
              </div>
              <div className="register-form__input-box">
                <img
                  className="input-icon"
                  src={
                    !confirmPasswordFocused && confirmPassword
                      ? '/lock-key-white.svg'
                      : '/lock-key.svg'
                  }
                  alt="password-icon"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onFocus={() => setConfirmPasswordFocused(true)}
                  onBlur={() => setConfirmPasswordFocused(false)}
                />
                <span className='addon' onClick={() => {
                  setShowPassword(!showPassword);
                }}>
                  {
                    showPassword ? <FiEyeOff /> : <FiEye />
                  }
                </span>
              </div>
              <button className="register-form__submit-btn" type="submit">
                {isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : 'Reset Password'}
              </button>
              {error && <p className='error-msg'>{error}</p>}
              {successMessage && <p className="success-msg">{successMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
