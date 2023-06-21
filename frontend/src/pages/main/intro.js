import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import './intro.css';
import IntroTable from '../components/table/introtable/introtable';
import IntroTableColumn from '../components/table/introtable/introtablecolumn';
import IntroTableRow from '../components/table/introtable/introtablerow';
import axios from 'axios';


const Intro = () => {
  const navigate = useNavigate();
  const [introArticle, setIntroArticle] = useState([]);
  const [introExternal, setIntroExternal] = useState([]);
  const [introVoc, setIntroVoc] = useState([]);


  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인 후 이용가능합니다.');
      navigate('/');
    }
    else{
      introArticles();
      introExternals();
      introVocs();
    }
  }, [navigate]);
  
  const introArticles = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      // article 정보 가져오기
      const response = await axios.get(`http://localhost:8080/intro/article`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    const introArticle = response.data;
    setIntroArticle(introArticle);
    }
    catch (error) {
      console.error('Error article', error);
    }
  };

  const introExternals = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      // External 정보 가져오기
      const response = await axios.get(`http://localhost:8080/intro/external`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    const introExternal = response.data;
    setIntroExternal(introExternal);
    }
    catch (error) {
      console.error('Error External', error);
    }
  };

  const introVocs = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      // Voc 정보 가져오기
      const response = await axios.get(`http://localhost:8080/intro/voc`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    const introVoc = response.data;
    setIntroVoc(introVoc);
    }
    catch (error) {
      console.error('Error Voc', error);
    }
  };
    



  return (
    <div className="intro-container">
      <Header />
      <Sidebar />
      <div className="background">
        <div className="container-1">

        </div>

        <div className="container-2">
          <span className='board-text-2'>공지사항</span>
          <div className="board-2">
            <IntroTable headersName={['글쓴이', '제목', '작성일']} columnWidths={['20%','55%','25%']}>
              {introArticle.map((article) => (
                <IntroTableRow>
                  <IntroTableColumn>{article.managerName}</IntroTableColumn>
                  <IntroTableColumn>{article.articleTitle}</IntroTableColumn>
                  <IntroTableColumn>{article.createdAt.substring(0,16)}</IntroTableColumn>
                </IntroTableRow>
              ))}
            </IntroTable>
          </div>          
        </div>

        <div className="container-3">
          <span className='board-text-3'>오늘의 VOC</span>
          <div className="board-3">
            <IntroTable headersName={['고객명', '지역', '장애유형', '조치여부']} columnWidths={['10%','','23%','12%']}>
              {introVoc.map((voc) => (
                <IntroTableRow>
                  <IntroTableColumn>{voc.customerName}</IntroTableColumn>
                  <IntroTableColumn>{voc.customerAddress}</IntroTableColumn>
                  <IntroTableColumn>{voc.type}</IntroTableColumn>
                  <IntroTableColumn>{voc.checkStatus}</IntroTableColumn>
                </IntroTableRow>
              ))}
            </IntroTable>
          </div>
        </div>

        <div className="container-4">
          <span className='board-text-4'>금일 공사 현황</span>
          <div className="board-4">
            <IntroTable headersName={['업체명', '접수 내용', '공사일시', '완료여부']} columnWidths={['20%','','21%','12%']}>
              {introExternal.map((external) => (
                <IntroTableRow>
                  <IntroTableColumn>{external.companyName}</IntroTableColumn>
                  <IntroTableColumn>{external.receiptContent}</IntroTableColumn>
                  <IntroTableColumn>{external.externalStartdate.substring(0,16)}</IntroTableColumn>
                  <IntroTableColumn>{external.externalStatus}</IntroTableColumn>
                </IntroTableRow>
              ))}
            </IntroTable>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Intro;
