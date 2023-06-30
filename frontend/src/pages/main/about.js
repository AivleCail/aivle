import React from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';
import './about.css';

const About = () => {

    return (
        <div className="web-layout">
        <Sidebar />
        <div className='right-container'>
            <Header />
            <div className="main-background">
                <div className="about-container">

                    <div className="about-top-container">
                        <div className='about-title-1'><span>CaiL 서비스 소개</span></div>
                        <div className='about-title-2'><span>CaiL 서비스에 대한 소개 페이지입니다.</span></div>
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
                                CaiL은 실시간으로 STT 기술과 NLP를 활용해 학습시킨 모델로 <br/>
                                    장애 조치 완료 여부를 파악하고, STT 모델과 NLP를 이용하여 <br/>
                                    사외공사 접수를 자동화하여 운용자의 빠른 업무 처리가 가능한 <br/>
                                    <b>AI 종합 업무 자동화</b> 서비스다.
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