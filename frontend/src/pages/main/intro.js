import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import './intro.css';
import CommonTable from '../components/table/CommonTable';
import CommonTableColumn from '../components/table/CommonTableColumn';
import CommonTableRow from '../components/table/CommonTableRow';

const Intro = () => {
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   const accessToken = localStorage.getItem('accessToken');
  //   if (!accessToken) {
  //     alert('로그인 후 이용가능합니다.');
  //     navigate('/');
  //   }
  // }, [navigate]);

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
            <CommonTable headersName={['제목', '글쓴이', '작성일']}>
              <CommonTableRow>
                <CommonTableColumn>이거 왜 안될까요...?</CommonTableColumn>
                <CommonTableColumn>KT관리자</CommonTableColumn>
                <CommonTableColumn>2023.06.18</CommonTableColumn>
              </CommonTableRow>
              <CommonTableRow>
                <CommonTableColumn>잠이 와요...</CommonTableColumn>
                <CommonTableColumn>KT관리자</CommonTableColumn>
                <CommonTableColumn>2023.06.18</CommonTableColumn>
              </CommonTableRow>
              <CommonTableRow>
                <CommonTableColumn>여긴 뭐 쓰지</CommonTableColumn>
                <CommonTableColumn>KT관리자</CommonTableColumn>
                <CommonTableColumn>2023.06.18</CommonTableColumn>
              </CommonTableRow>
              <CommonTableRow className='last-row'>
                <CommonTableColumn>안녕안녕~~</CommonTableColumn>
                <CommonTableColumn>KT관리자</CommonTableColumn>
                <CommonTableColumn>2023.06.18</CommonTableColumn>
              </CommonTableRow>
            </CommonTable>
          </div>          
        </div>

        <div className="container-3">
          <span className='board-text-3'>오늘의 VOC</span>
          <div className="board-3">
            <CommonTable headersName={['고객명', '지역', '장애유형', '조치여부']}>
              <CommonTableRow>
                <CommonTableColumn>김OO</CommonTableColumn>
                <CommonTableColumn>남구</CommonTableColumn>
                <CommonTableColumn>인터넷 고장</CommonTableColumn>
                <CommonTableColumn className='status'>O</CommonTableColumn>
              </CommonTableRow>
              <CommonTableRow>
                <CommonTableColumn>박OO</CommonTableColumn>
                <CommonTableColumn>해운대구</CommonTableColumn>
                <CommonTableColumn>인터넷 고장</CommonTableColumn>
                <CommonTableColumn className='status'>X</CommonTableColumn>
              </CommonTableRow>
              <CommonTableRow>
                <CommonTableColumn>이OO</CommonTableColumn>
                <CommonTableColumn>금정구</CommonTableColumn>
                <CommonTableColumn>인터넷 고장</CommonTableColumn>
                <CommonTableColumn className='status'>X</CommonTableColumn>
              </CommonTableRow>
              <CommonTableRow className='last-row'>
                <CommonTableColumn>최OO</CommonTableColumn>
                <CommonTableColumn>사하구</CommonTableColumn>
                <CommonTableColumn>인터넷 고장</CommonTableColumn>
                <CommonTableColumn className='status'>X</CommonTableColumn>
              </CommonTableRow>
            </CommonTable>
          </div>
        </div>

        <div className="container-4">
          <span className='board-text-4'>금일 공사 형황</span>
          <div className="board-4">
            <CommonTable headersName={['업체명', '접수 내용', '공사일시', '완료여부']}>
              <CommonTableRow>
                <CommonTableColumn>A업체</CommonTableColumn>
                <CommonTableColumn>OOOO</CommonTableColumn>
                <CommonTableColumn>2023.06.18 02:12</CommonTableColumn>
                <CommonTableColumn className='status'>O</CommonTableColumn>
              </CommonTableRow>
              <CommonTableRow>
                <CommonTableColumn>B업체</CommonTableColumn>
                <CommonTableColumn>OOOO</CommonTableColumn>
                <CommonTableColumn>2023.06.18 02:12</CommonTableColumn>
                <CommonTableColumn className='status'>X</CommonTableColumn>
              </CommonTableRow>
              <CommonTableRow>
                <CommonTableColumn>C업체</CommonTableColumn>
                <CommonTableColumn>OOOO</CommonTableColumn>
                <CommonTableColumn>2023.06.18 02:15</CommonTableColumn>
                <CommonTableColumn className='status'>X</CommonTableColumn>
              </CommonTableRow>
              <CommonTableRow className='last-row'>
                <CommonTableColumn>E업체</CommonTableColumn>
                <CommonTableColumn>OOOO</CommonTableColumn>
                <CommonTableColumn>2023.06.18 02:15</CommonTableColumn>
                <CommonTableColumn className='status'>O</CommonTableColumn>
              </CommonTableRow>
            </CommonTable>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Intro;
