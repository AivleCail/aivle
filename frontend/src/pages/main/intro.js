import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';
import './intro.css';
import IntroTable from '../components/table/introtable/introtable';
import IntroTableColumn from '../components/table/introtable/introtablecolumn';
import IntroTableRow from '../components/table/introtable/introtablerow';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import { API_URL } from '../config';

const Intro = () => {
  const navigate = useNavigate();
  const [voctypeData,  setVocTypeData] = useState([]);
  const [articleData, setArticleData] = useState([]);
  const [chart1Data, setChart1Data] = useState([]);
  const [chart2Data, setChart2Data] = useState([]);

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

  useEffect(() => {
    const blockedPaths = ['/myexternal'];
    if (blockedPaths.includes(window.location.pathname)) {
      navigate('/article');
    }
  }, [navigate]);

    
  return (
    <div className="web-layout">
      <Sidebar />
      <div className='right-container'>
        <Header />
        <div className="main-background">
          <div className = "top-container">
            <div className="container-1">
              <div className = "chart chart-1">
              <Chart
              width={'100%'}
              height={'95%'}
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['date', '건수', { role: 'annotation' }],
                ...chart1Data.map((item) => [
                  new Date(item.weekStart).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }), // Format the date to display only the date portion (MM-DD)
                  item.count,
                  item.count.toString(),
                ]),
              ]}
              options={{
                title: '일주일간 사외공사 현황 ',
                hAxis: {
                  title: 'Week',
                },
                vAxis: {
                  title: '건수',
                  titleTextStyle: {
                    italic: false,
                    bold: true,
                  },
                },
                annotations: {
                  textStyle: {
                    fontSize: 10,
                    bold: true,
                  },
                  annotationTextPosition: 'out',
                },
              }}
            />
              </div>
            </div>

                
              <div className="container-2">
                <div className="fake-rect">
                  <div className='title'>Best 조치사례</div>
                    <IntroTable headersName={['글쓴이', '제목', '추천수','작성일']} columnWidths={['15%','45%','10%','30%']}>
                        {articleData.map((article) => (
                          <IntroTableRow>
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


          <div className = "bottom-container">
            <div className="container-3">
              <div className = "chart chart-3">
                <Chart 
                  width={'100%'}
                  height={'95%'}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['status', 'total'],
                    ...chart2Data.map((item) => [item.status, item.total]),
                  ]}
                  options={{
                    title: '사외공사 진행 현황',
                    is3D: false,
                    pieHole: 0.5,
                    colors: ['#FFF100','#16C60C','#E81224'],
                    slices: {  
                      textStyle: {color: 'black', },
                    },
                    legend: {
                      position: 'bottom',
                      textStyle: {
                        color: '#666',
                        fontSize: 13,
                      },
                    },
                    pieSliceTextStyle:{
                      color: 'black',
                      bold: true,
                    },
                  }}
                />
              </div>
            </div>
            
            <div className="container-4">
              <div className = "chart chart-4">
                <Chart
                  width={'100%'}
                  height={'95%'}
                  chartType="PieChart"
                  loader={<div>Loading</div>}
                  data={[
                    ['Category', 'Count'],
                    ['TV', voctypeData.tvCount],
                    ['인터넷', voctypeData.internetCount],
                    ['전화', voctypeData.phoneCount],
                  ]}
                  options={{
                    title: '오늘 발생한 장애 유형',
                    is3D: true,
                    colors: ['#2196F3','#FF9800','#00BCD4'],
                    slices: {  
                      textStyle: {color: 'black',  },
                    },
                    legend: {
                      position: 'bottom',
                      textStyle: {
                        color: '#666',
                        fontSize: 13,
                      },
                    },
                    pieSliceTextStyle:{
                      color: 'black',
                      bold: true,
                    },
                    }}
                    />
                </div>
              </div>
            </div>
          </div>
        <Footer />
      </div>
    </div>
  );
};

export default Intro;
