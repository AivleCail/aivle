import Reactt, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import './Member.css';
import Modal from '../../components/modal/Modal';
import { ReactComponent as Logo } from '../icons/logo.svg';

const LoginContext = (
  {
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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const openModal2 = () => {
    setIsOpenModal2(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const closeModal2 = () => {
    setIsOpenModal2(false);
  };

  return (
    <div className="context">
      <div className="login-logo">
        <Logo width='250' height='auto' />
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
        <label className='terms'><strong onClick={openModal}>개인정보 처리방침</strong></label>
        {isOpenModal && (
        <Modal isOpen={isOpenModal} closeModal={closeModal} entity="userInfo"/>
      )}  
  
        <label className='terms'><strong onClick={openModal2}>이용약관</strong></label>
        {isOpenModal2 && (
        <Modal isOpen={isOpenModal2} closeModal={closeModal2} entity="userInfo2"/>
      )}
      </div>
    </div>
  );
};

export default LoginContext;
