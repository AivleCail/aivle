import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import './Member.css';
import { ReactComponent as Logo } from '../icons/logo.svg';

const LoginContext = ({
  activeIndex,
  handleManagerClick,
  handleExternalWorkerClick,
  email,
  password,
  setEmail,
  setPassword,
  handleLogin,
  emailErr,
  passwordErr,
  err,
}) => {
  return (
    <div className="context">
      <div className="login-logo">
        <Logo width='300' height='auto' />
        <span className="login-logo-text">고객 및 사외공사 신고 자동 대응 및 관리 서비스</span>
      </div>
      <LoginForm
        activeIndex={activeIndex}
        handleManagerClick={handleManagerClick}
        handleExternalWorkerClick={handleExternalWorkerClick}
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleLogin={handleLogin}
        emailErr={emailErr}
        passwordErr={passwordErr}
        err={err}
      />
      <Link to={"/signup"} className='signup-link'>회원가입</Link>
      <div className='terms-group'>
        <Link to={"/signup"} className='terms'>개인정보 처리방침</Link>
        |
        <Link to={"/signup"} className='terms'>이용약관</Link>
      </div>
    </div>
  );
};

export default LoginContext;
