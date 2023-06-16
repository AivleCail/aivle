import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import './intro.css';

const Intro = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인 후 이용가능합니다.');
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="intro-container">
      <Header />
      <Sidebar />
      <div className="background"></div>
    </div>
  );
};

export default Intro;
