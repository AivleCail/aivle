import React, {useEffect } from 'react';
import Header from '../../components/layout/header';
import Sidebar from '../../components/layout/sidebar';
import Footer from '../../components/layout/footer';
import './about.css';
import { useNavigate } from 'react-router-dom';

const About = () => {

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
                <div className="about-container">

                    <div className="about-top-container">
                        <div className='about-title-1'><span>CaIL 솔루션 </span></div>
                        <div className='about-title-2'><span>CaIL 솔루션에 대한 소개 페이지입니다.</span></div>
                    </div>


                    <div className='about-mid-container'>
                        <div className='about-mid-left'>
                            <img className="left-img" src={process.env.PUBLIC_URL + "ai.png"}/>
                        </div>

                        <div className='about-mid-right'>
                            <div className='about-mid-text-1'>
                                <span className='text-1-title'>What is CaiL</span><br/>
                                <br/>
                                <span className='text-1-content'>
                                CaiL은 실시간으로 STT 기술과 NLP를 활용해 학습시킨 모델로
                                장애 조치 완료 여부를 파악하고, STT 모델과 NLP를 이용하여
                                사외공사 접수를 자동화하여 운용자의 빠른 업무 처리가
                                가능한 <b>AI 종합 업무 자동화</b> 서비스입니다.
                                </span>
                            </div>

                            <br/>

                            <div className='about-mid-text-2'>
                                <span className='text-2-title'>Core Technology</span><br/>
                                <br/>
                                <span className='text-2-content'>
                                    <li>➢ STT</li>
                                    <li>➢ NLP</li>
                                    <li>➢ Multi TeleMarketing</li>
                                    <li>➢ Best Solution</li>
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
        </div>
    );
};

export default About;