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
      <div className="logo">
        <Logo width='400'/>
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
      {emailErr && <p className="log-error-message1">이메일을 입력해주세요.</p>}
      {passwordErr && <p className="log-error-message1">비밀번호를 입력해주세요.</p>}
      {err && (
        <div
          className="log-error-message2"
          dangerouslySetInnerHTML={{ __html: err }}
        />
      )}

      <Link to={"/signup"} className='signup-link'>회원가입</Link>
    </div>
  );
};

export default LoginContext;
