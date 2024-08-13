import './LoginPage.scss';

import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import logo from '../../images/waf_logo.png';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/playground');
  };

  return (
    <Fragment>
      <div className="login">
        <figure className="login-logo">
          <img className="login-logo__image" src={logo} alt="" />
        </figure>
        <div className="login-form">
          <TextInput type="text" placeholder="School ID" />
          <TextInput type="text" placeholder="Username" />
          <TextInput type="password" placeholder="Password" />
          <div className="login-form-actions">
            <Button onClick={handleRedirect}>Login</Button>
          </div>
        </div>
        <footer className="login-footer poppins-light">
          <p>
            By continuing, you agree to our {''}
            <a target="_blank" rel="noreferrer">
              Terms &#38; Conditions
            </a>
            {''} and {''}
            <a target="_blank" rel="noreferrer">
              Privacy Policy
            </a>
          </p>
          {/* <img id="tirLogo" className="login-footer__logo" src={tirLogo} alt="" /> */}
        </footer>
      </div>
    </Fragment>
  );
};

export default LoginPage;
