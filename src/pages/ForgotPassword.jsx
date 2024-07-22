import { useState } from 'react';
import './Login.css';
import instance from '../utils/api';
import { useToast } from '@chakra-ui/react';
import { validateEmail } from '../utils/validators';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid email address.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await instance.post('/user/auth/forgot-password', {
        email,
      });
      console.log(response.data);
      toast({
        title: response.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: "Something went wrong, please try again later.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
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
