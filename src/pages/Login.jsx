import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import './Login.css';
import instance from '../utils/api';
import { ACCESS_TOKEN } from '../utils/constants';
import { validateEmail } from '../utils/validators';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      //    Send ID token to backend
      const idToken = await result.user.getIdToken();
      console.log(idToken);
      const response = await instance.post("/user/google-login", { idToken });

      // Handle response from backend
      const data = response.data;
      console.log(data);
      localStorage.setItem("accessToken", data);
      const loginTime = new Date().getTime();
      localStorage.setItem('loginTime', loginTime);
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };



  const handleEmailChange = (event) => {
    setEmail(event.target.value.toLowerCase());
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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
      const response = await instance.post('/user/auth/login', {
        email,
        password,
      });

      localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
      const loginTime = new Date().getTime();
      localStorage.setItem('loginTime', loginTime);
      navigate('/');
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
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <button className="register-form__submit-btn" type="submit">
                {isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : 'Sign In'}
              </button>
            </form>
            {error && <p className='error-msg'>{error}</p>}
            <div className="register-form__signin">
              <p>
                New to eliteplay? <Link to="/register">Sign Up</Link>
              </p>
            </div>
            <div className="register-form__option-box">
              <p className="register-form__option">or</p>
            </div>

            <div onClick={signInWithGoogle} className="register-form__google-signin">
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
