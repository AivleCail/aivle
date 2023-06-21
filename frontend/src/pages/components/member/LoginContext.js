import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import Logo from '../icons/logo.svg';
import bg from '../icons/bg.svg';
import './Member.css';

const LoginContext = ({
  activeIndex,
  handleManagerClick,
  handleExternalWorkerClick,
  email,
  password,
  setEmail,
  setPassword,
  handleLogin,
}) => {
  return (
    <div className="context">
      <div className="bg">
        <img className="bg-img" alt="bg" src={bg} />
      </div>
      <div className="logo">
        <img className="logo-img" alt="logo" src={Logo} />
        <span className="logo-text">고객 및 사외공사 신고 자동 대응 및 관리 서비스</span>
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
      />
      <Link to={"/signup"} className='signup-link'>회원가입</Link>
    </div>
  );
};

export default LoginContext;
