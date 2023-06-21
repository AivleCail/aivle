import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import './intro.css';
import IntroTable from '../components/table/introtable/introtable';
import IntroTableColumn from '../components/table/introtable/introtablecolumn';
import IntroTableRow from '../components/table/introtable/introtablerow';

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
      <div className="background">
        <div className="container-1">

        </div>

        <div className="container-2">
          <span className='board-text-2'>공지사항</span>
          <div className="board-2">
            <IntroTable headersName={['제목', '글쓴이', '작성일']}
            columnWidths={['60%','20%','20%']}>
              <IntroTableRow>
                <IntroTableColumn className="left-align">이거 왜 안될까요...?</IntroTableColumn>
                <IntroTableColumn>KT관리자</IntroTableColumn>
                <IntroTableColumn>2023.06.18</IntroTableColumn>
              </IntroTableRow>
              <IntroTableRow>
                <IntroTableColumn className="left-align">잠이 와요...</IntroTableColumn>
                <IntroTableColumn>KT관리자</IntroTableColumn>
                <IntroTableColumn>2023.06.18</IntroTableColumn>
              </IntroTableRow>
              <IntroTableRow>
                <IntroTableColumn className="left-align">여긴 뭐 쓰지</IntroTableColumn>
                <IntroTableColumn>KT관리자</IntroTableColumn>
                <IntroTableColumn>2023.06.18</IntroTableColumn>
              </IntroTableRow>
              <IntroTableRow>
                <IntroTableColumn className="left-align">안녕안녕~~</IntroTableColumn>
                <IntroTableColumn>KT관리자</IntroTableColumn>
                <IntroTableColumn>2023.06.18</IntroTableColumn>
              </IntroTableRow>
            </IntroTable>
          </div>          
        </div>

        <div className="container-3">
          <span className='board-text-3'>오늘의 VOC</span>
          <div className="board-3">
            <IntroTable headersName={['고객명', '지역', '장애유형', '조치여부']}
            columnWidths={['10%','','23%','12%']}>
              <IntroTableRow>
                <IntroTableColumn>김OO</IntroTableColumn>
                <IntroTableColumn>남구 OO동</IntroTableColumn>
                <IntroTableColumn>인터넷</IntroTableColumn>
                <IntroTableColumn className='status'>O</IntroTableColumn>
              </IntroTableRow>
              <IntroTableRow>
                <IntroTableColumn>박OO</IntroTableColumn>
                <IntroTableColumn>해운대구 OO동</IntroTableColumn>
                <IntroTableColumn>인터넷</IntroTableColumn>
                <IntroTableColumn className='status'>X</IntroTableColumn>
              </IntroTableRow>
              <IntroTableRow>
                <IntroTableColumn>이OO</IntroTableColumn>
                <IntroTableColumn>금정구 OO동</IntroTableColumn>
                <IntroTableColumn>인터넷</IntroTableColumn>
                <IntroTableColumn className='status'>X</IntroTableColumn>
              </IntroTableRow>
              <IntroTableRow className='last-row'>
                <IntroTableColumn>최OO</IntroTableColumn>
                <IntroTableColumn>사하구 OO동</IntroTableColumn>
                <IntroTableColumn>인터넷</IntroTableColumn>
                <IntroTableColumn className='status'>X</IntroTableColumn>
              </IntroTableRow>
            </IntroTable>
          </div>
        </div>

        <div className="container-4">
          <span className='board-text-4'>금일 공사 현황</span>
          <div className="board-4">
            <IntroTable headersName={['업체명', '접수 내용', '공사일시', '완료여부']}
            columnWidths={['20%','','21%','12%']}>
              <IntroTableRow>
                <IntroTableColumn>A업체</IntroTableColumn>
                <IntroTableColumn>OOOO</IntroTableColumn>
                <IntroTableColumn>2023.06.18 02:12</IntroTableColumn>
                <IntroTableColumn className='status'>O</IntroTableColumn>
              </IntroTableRow>
              <IntroTableRow>
                <IntroTableColumn>B업체</IntroTableColumn>
                <IntroTableColumn>OOOO</IntroTableColumn>
                <IntroTableColumn>2023.06.18 02:12</IntroTableColumn>
                <IntroTableColumn className='status'>X</IntroTableColumn>
              </IntroTableRow>
              <IntroTableRow>
                <IntroTableColumn>C업체</IntroTableColumn>
                <IntroTableColumn>OOOO</IntroTableColumn>
                <IntroTableColumn>2023.06.18 02:15</IntroTableColumn>
                <IntroTableColumn className='status'>X</IntroTableColumn>
              </IntroTableRow>
              <IntroTableRow className='last-row'>
                <IntroTableColumn>E업체</IntroTableColumn>
                <IntroTableColumn>OOOO</IntroTableColumn>
                <IntroTableColumn>2023.06.18 02:15</IntroTableColumn>
                <IntroTableColumn className='status'>O</IntroTableColumn>
              </IntroTableRow>
            </IntroTable>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Intro;
