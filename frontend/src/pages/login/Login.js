import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../components/member/LoginContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [role, setRole] = useState(''); //eslint-disable-line no-unused-vars
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [err, setErr] = useState('');

  const handleManagerClick = () => {
    setActiveIndex(0);
  };

  const handleExternalWorkerClick = () => {
    setActiveIndex(1);
  };

  useEffect(() => {
    if (activeIndex === 0) {
      setRole('ROLE_ADMIN');
    } else if (activeIndex === 1) {
      setRole('ROLE_USER');
    }
  }, [activeIndex]);

  
  const handleLogin = () => {
    setEmailErr(false); // 이메일 에러 상태 초기화
    setPasswordErr(false); // 비밀번호 에러 상태 초기화
    setErr(''); // 일치하지 않는 이메일 또는 비밀번호 에러 초기화

    if (email.trim() === '') {
      setEmailErr(true); // 이메일이 비어있는 경우 에러 표시
      return;
    }

    if (password.trim() === '') {
      setPasswordErr(true); // 비밀번호가 비어있는 경우 에러 표시
      return;
    }

    let role = '';
    if (activeIndex === 0) {
      role = 'ROLE_ADMIN';
    } else if (activeIndex === 1) {
      role = 'ROLE_USER';
    }

    axios
      .post('http://localhost:8080/auth/login', {
        email: email,
        password: password,
        auth: role,
      })
      .then((response) => {
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    
        if (role === 'ROLE_USER') {
          navigate('/myexternal');
        } else {
          navigate('/intro');
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        setErr('이메일 또는 비밀번호가 일치하지 않습니다.');
      });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/intro');
    } else {
      navigate('/');
    }
  }, [navigate]);


  return (
    <div className="container">
      <div className="bg-img" style={{ backgroundImage: 'url(bg.svg)' }}></div>
      <LoginContext
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
    </div>
  );
};

export default Login;
