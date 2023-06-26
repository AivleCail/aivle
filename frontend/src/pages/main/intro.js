import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';
// import './intro.css';
import '../../test/intro_test.css';
import IntroTable from '../components/table/introtable/introtable';
import IntroTableColumn from '../components/table/introtable/introtablecolumn';
import IntroTableRow from '../components/table/introtable/introtablerow';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const Intro = () => {
  const navigate = useNavigate();
  const [voctypeData,  setVocTypeData] = useState([]);
  const [vocanswerData, setVocAnswerData] = useState([]);
  const [chart1Data, setChart1Data] = useState([]);
  const [chart2Data, setChart2Data] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인 후 이용가능합니다.');
      navigate('/');
    } else {
      vocType();
      vocAnswer();
      fetchChart1Data();
      fetchChart2Data();
    }
  }, [navigate]);

  const fetchChart1Data = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:8080/intro/external-month-count', {
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
      const response = await axios.get('http://localhost:8080/intro/external-status', {
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
      const response = await axios.get(`http://localhost:8080/intro/voc-total`, {
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

  const vocAnswer = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`http://localhost:8080/intro/voc-answer`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data  = response.data;
      setVocAnswerData(data);
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
    <div className="intro-container">
      <div>
      <Header />
      <Sidebar />
      </div>
      <div className="background">
        <div className = "top-container">
          <div className="container-1">
            <div className = "chart-1">
            <Chart
              width={'100%'}
              height={'100%'}
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['월', '건수'],
                ...chart1Data.map((item) => [new Date(item.yearMonth), item.count]),
              ]}
              options={{
                title: '월별 사외공사 건수',
                hAxis: {
                  title: '월',
                  format: 'MM월',
                  textStyle: {
                    fontSize: 10,
                    bold: false,
                  },
                  ticks: [
                    new Date(2023, 0),
                    new Date(2023, 1),
                    new Date(2023, 2),
                    new Date(2023, 3),
                    new Date(2023, 4),
                    new Date(2023, 5),
                    new Date(2023, 6),
                    new Date(2023, 7),
                    new Date(2023, 8),
                    new Date(2023, 9),
                    new Date(2023, 10),
                    new Date(2023, 11),
                  ],
                  titleTextStyle: {
                    italic: false,
                    bold: true,
                  }
                },
                vAxis: {
                  title: '건수',
                  titleTextStyle: {
                    italic: false,
                    bold: true,
                  }
                },
              }}
            />
            </div>
          </div>

          <div className="container-2">
              <div className = "chart-2">
            <Chart 
              width={'100%'}
              height={'100%'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['status', 'total'],
                ...chart2Data.map((item) => [item.status, item.total]),
              ]}
              options={{
                title: '사외공사현황',
                is3D: true,
                colors: ['#FFF100','#16C60C','#E81224'],
                slices: {  
                  textStyle: {color: 'black', },
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



        <div className = "bottom-container">
          <div className="container-3">
            <div className = "chart-3">
            <Chart
              width={'100%'}
              height={'100%'}
              chartType="PieChart"
              loader={<div>Loading</div>}
              data={[
                ['Category', 'Count'],
                ['TV', voctypeData.tvCount],
                ['인터넷', voctypeData.internetCount],
                ['전화', voctypeData.phoneCount],
              ]}
              options={{
                title: '장애 유형 분류',
                is3D: true,
                colors: ['#FFF100','#16C60C','#E81224'],
                slices: {  
                  textStyle: {color: 'black', },
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
            <div className = "chart-4">
            <Chart
              width={'100%'}
              height={'100%'}
              chartType="PieChart"
              loader={<div>Loading</div>}
              data={[
                ['Category', 'Count'],
                ['만족', vocanswerData.goodAnswer],
                ['불만족', vocanswerData.badAnswer],
                ['매우불만족', vocanswerData.veryBadAnswer],
              ]}
              options={{
                title: '고객 응답 현황',
                is3D: true,
                colors: ['#16C60C','#FFF100','#E81224'],
                slices: {  
                  textStyle: {color: 'black', },
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
      <Footer />
      </div>

    </div>
  );
};

export default Intro;
