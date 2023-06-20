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
  const [role, setRole] = useState('');

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
    if (email.trim() === '') {
      alert('이메일을 입력해주세요.');
      return;
    }

    if (password.trim() === '') {
      alert('비밀번호를 입력해주세요.');
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
        console.log('Access token:', accessToken);
        localStorage.setItem('accessToken', accessToken);
        if (role === 'ROLE_USER') {
          navigate('/myexternal');
        } else {
          navigate('/intro');
        }
      })
      .catch((error) => {
        // Handle error.
        console.error('Login error:', error);
        alert('이메일 또는 비밀번호가 일치하지 않습니다.');
      });
  };

  return (
    <div className="container">
      <div className="bg-img" style={{ backgroundImage: 'url(login_background.png)' }}></div>
      <LoginContext
        activeIndex={activeIndex}
        handleManagerClick={handleManagerClick}
        handleExternalWorkerClick={handleExternalWorkerClick}
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    </div>
  );
};

export default Login;

