import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';
import './intro.css';
import IntroTable from '../components/table/introtable/introtable';
import IntroTableColumn from '../components/table/introtable/introtablecolumn';
import IntroTableRow from '../components/table/introtable/introtablerow';
import Modal from '../components/modal/Modal';
import axios from 'axios';
import { API_URL } from '../config';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement
);


const Intro = () => {
  const navigate = useNavigate();
  const [voctypeData,  setVocTypeData] = useState([]);
  const [articleData, setArticleData] = useState([]);
  const [chart1Data, setChart1Data] = useState([]);
  const [chart2Data, setChart2Data] = useState([]);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인 후 이용가능합니다.');
      navigate('/');
    } else {
      vocType();
      bestArticle();
      fetchChart1Data();
      fetchChart2Data();
    }
  }, [navigate]);

  
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      window.history.forward(); 
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);


  const fetchChart1Data = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_URL}8080/intro/external-week-count`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data;
      setChart1Data(data);
    } catch (error) {
      console.error('Error fetching chart data', error);
    }
  };


  const fetchChart2Data = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_URL}8080/intro/external-status`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data;
      setChart2Data(data);
    } catch (error) {
      console.error('Error fetching chart data', error);
    }
  };


  const vocType = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_URL}8080/intro/voc-total`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data  = response.data;
      setVocTypeData(data);
    } catch (error) {
      console.error('Error External', error);
    }
  };


  const bestArticle = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_URL}8080/intro/article`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data  = response.data;
      setArticleData(data);
    } catch (error) {
      console.error('Error Voc', error);
    }
  };


  // Modal Open
  const openModal = async (article) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      // Article 정보 가져오기
      const response = await axios.get(`${API_URL}8080/article/one?id=${article.articleId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const detailedArticle = response.data;

      // 댓글 정보 가져오기
      const commentResponse = await axios.get(`${API_URL}8080/comment/list?id=${article.articleId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const comments = commentResponse.data;

      // Article 정보와 댓글 정보를 합쳐서 선택된 article에 comments 필드 추가
      const articleWithComments = { ...detailedArticle, comments };

      setSelectedArticle(articleWithComments);
      setIsOpenModal(true);
    } catch (error) {
      console.error('Error fetching article details:', error);
    }
  };
  // Model Close
  const closeModal = () => {
    setSelectedArticle(null);
    setIsOpenModal(false);
  };


  useEffect(() => {
    const blockedPaths = ['/myexternal'];
    if (blockedPaths.includes(window.location.pathname)) {
      navigate('/article');
    }
  }, [navigate]);



  const chart1Data_options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '일주일간 사외공사 현황',
        font: {
          family: 'TheJamsilLight',
          size: 17,
        },
      },
    },
  };

  const chart1Data_data = {
    labels : chart1Data.map(item => item.weekStart.substring(5,10)),
    datasets: [
      {
        label: '건수',
        data: chart1Data.map(item => item.count),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const chart2Data_options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'left',
      },
      title: {
        display: true,
        text: '사외공사 진행 현황',
        font: {
          family: 'TheJamsilLight',
          size: 17,
          color: 'black',
        },
      },
    },
  };


  const chart2Data_data = {
    labels: chart2Data.map(item => item.status),
    datasets: [
      {
        label: '공사 현황',
        data: chart2Data.map(item => item.total),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const voctypeData_options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'left',
      },
      title: {
        display: true,
        text: '오늘 발생한 장애 유형',
        font: {
          family: 'TheJamsilLight',
          size: 17,
        },
      },
    },
  };

  const voctypeData_data = {
    labels: ['TV', '인터넷', '전화'],
    datasets: [
      {
        label: '유형',
        data: [
          voctypeData.tvCount,
          voctypeData.internetCount,
          voctypeData.phoneCount,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

    
  return (
    <div className="web-layout">
      <Sidebar />
      <div className='right-container'>
        <Header />
        <div className="main-background main-overflow">
        <div className='row'>
          <div className='column'>
            <div className='chart chart1'>
              <Bar options={chart1Data_options} data={chart1Data_data} />
            </div>
          </div>
          <div className='column'>
            <div className = "chart chart2">
              <div className="fake-rect">
                    <div className='title'>Best 조치사례</div>
                      <IntroTable headersName={['글쓴이', '제목', '추천수','작성일']} columnWidths={['15%','45%','10%','30%']}>
                          {articleData.map((article) => (
                            <IntroTableRow
                              key={article.articleId}
                              onClick={() => openModal(article)
                              }>
                              <IntroTableColumn className='intro-con2-name'>{article.managerName.length > 1 ? `${article.managerName.charAt(0)}*${article.managerName.slice(-1)}` : article.managerName}</IntroTableColumn>
                              <IntroTableColumn className='intro-con2-title'>{article.articleTitle}</IntroTableColumn>
                              <IntroTableColumn>{article.likeCount}</IntroTableColumn>
                              <IntroTableColumn>{article.createdAt.substring(0,16)}</IntroTableColumn>
                            </IntroTableRow>
                          ))}
                        </IntroTable>
                  </div>
              </div>
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <div className='chart chart3'>
              <Doughnut options={chart2Data_options} data={chart2Data_data} />
            </div>
          </div>
          <div className='column'>
            <div className='chart chart4'>
              <Doughnut options={voctypeData_options} data={voctypeData_data} className='Doughnut_chart'/>
            </div>
          </div>
        </div>

          {isOpenModal && (
            <Modal isOpen={isOpenModal} closeModal={closeModal} entity="article" article={selectedArticle} comments={selectedArticle.comments}/>
          )}
          </div>
        <Footer />
      </div>
    </div>
  );
};

export default Intro;
