import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import './intro.css';

const Intro = () => {
  const navigate = useNavigate();
    return (
      <div className="intro-container">
        <Header />
        <Sidebar />
        <div className="background">
          <div className="container-1">

          </div>

          <div className="container-2">

          </div>

          <div className="container-3">

          </div>

          <div className="container-4">
            
          </div>
        </div>
      </div>
    );
  };
  

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
