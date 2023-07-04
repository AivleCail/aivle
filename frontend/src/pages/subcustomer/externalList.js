import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListContainer from '../components/list/ListContainer';
import Paging from '../main/page/paging';
import './external.css';
import { API_URL } from "../config";
const ExternalList = () => {
  const [externalList, setExternalList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [externalPerPage] = useState(5);
  const [expanded, setExpanded] = useState([]);
  const navigate = useNavigate();

  const handleClick = (index) => {
    setExpanded((prevState) => {
      const updatedExpanded = [...prevState];
      updatedExpanded[index] = !updatedExpanded[index];
      return updatedExpanded;
    });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인 후 이용가능합니다.');
      navigate('/');
    } 
  }, [navigate]);

  


  const handleLogout = () => {
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    if (confirmLogout) {
      localStorage.removeItem('accessToken');
      alert('로그아웃 되었습니다.');
      navigate('/');
    }
  };


  useEffect(() => {
    fetchMyExternalList();
  }, []);

  const fetchMyExternalList = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const page = currentPage;
      const response = await axios.get(`${API_URL}8080/worker/page?page=${page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const myExternalListData = response.data.content;
      setExternalList(myExternalListData);
      setExpanded(new Array(myExternalListData.length).fill(false));
    } catch (error) {
      console.error('Error fetching my external list:', error);
    }
  };

  const indexOfLastExternal = currentPage * externalPerPage;
  const indexOfFirstExternal = indexOfLastExternal - externalPerPage;
  const currentExternalList = externalList.slice(indexOfFirstExternal, indexOfLastExternal);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRefresh = () => {
    fetchMyExternalList();
  };


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

  return (
    <div className='mobile-container'>
      <div className='mobile-title'>
        <div className='div-null'></div>
        <span className='title-text'>공사 신고 접수 내역</span>
        <button className="list-logout-button" onClick={handleLogout}>
          <img className="list-logout-button-detail" src={process.env.PUBLIC_URL + '/logout.svg'} alt="Logout"/>
        </button>
      </div>
      <hr />
      <Link to={"/externalreceipt"}><button className='receipt-button to-receipt-button'>공사 신고 접수</button></Link>
      <hr />
      <div className='list-content'>
        <div className='sub-title'>
          <div class='title-dummy-div'></div>
          <span className='sub-title-text'>접수 목록</span>
          <button className="external-refresh-button" onClick={handleRefresh}>
            <img className="voc-img" alt="Element" src={process.env.PUBLIC_URL + "/refresh-arrow.png"} />
          </button>
        </div>
        <hr />
        <ListContainer currentExternalList={currentExternalList} expanded={expanded} handleClick={handleClick} />
      </div>

      <Paging
        articlesPerPage={externalPerPage}
        totalArticles={externalList.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ExternalList;
