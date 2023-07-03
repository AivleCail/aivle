import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';
import './develops.css';
import { useNavigate } from 'react-router-dom';





const Teams = () => {
  const navigate = useNavigate();

  useEffect(() => {  // 토큰 없으면 접근 불가능
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/');
    }
  }, [navigate]);

    return (
        <div className="web-layout">
        <Sidebar />
          <div className='right-container'>
              <Header />
                <div className="main-background">
                    <div className="teams-container">

                       <div className='teams-top-members'>
                          <div className='teams-member'>
                          <img src={process.env.PUBLIC_URL + "/members/member_minkyeong.webp"} />
                            <div className="description">
                              <h1>조민경</h1>
                              <h2>AI, FrontEnd</h2>
                            </div>
                          </div>

                          <div className='teams-member'>
                            <img src={process.env.PUBLIC_URL + "/members/member_daye.webp"} />
                            <div className="description">
                              <h1>박다예</h1>
                              <h2>AI</h2>
                            </div>
                          </div>

                          <div className='teams-member'>
                            <img src={process.env.PUBLIC_URL + "/members/member_taeho.webp"} />
                            <div className="description">
                              <h1>윤태호</h1>
                              <h2>BackEnd, DB</h2>
                            </div>
                          </div>

                          <div className='teams-member'>
                            <img src={process.env.PUBLIC_URL + "/members/member_kyuyeong.webp"} />
                            <div className="description">
                              <h1>정규영</h1>
                              <h2>BackEnd, DB, Deploy</h2>
                            </div>
                          </div>

                        </div>

                        <div className='teams-bottom-members'>
                              <div className='teams-member'>
                                <img src={process.env.PUBLIC_URL + "/members/member_seongmin.webp"} />
                                  <div className="description">
                                  <h1>주성민</h1>
                                  <h2>BackEnd, DB</h2>
                                  </div>
                              </div>
                              
                              <div className='teams-member'>
                                <img src={process.env.PUBLIC_URL + "/members/member_sunhye.webp"} />
                                <div className="description">
                                <h1>신선혜</h1>
                                <h2>UI/UX , FrontEnd</h2>
                                </div>
                              </div>

                              <div className='teams-member'>
                                <img src={process.env.PUBLIC_URL + "/members/member_junwoo.webp"}/>
                                <div className="description">
                                <h1>변준우</h1>
                                <h2>UI/UX , FrontEnd</h2>
                                </div>
                              </div>
                        </div>
                                
                     </div>
                     <Footer />     
                </div>
                
          </div>
    </div>
    );
};

export default Teams;