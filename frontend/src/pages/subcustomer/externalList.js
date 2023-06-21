import React, { useState, useEffect } from "react";
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import ListContainer from '../components/list/ListContainer';
import Paging from '../main/page/paging'; 
import './external.css';


const ExternalList = () => {
  const [externalList, setExternalList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [externalPerPage] = useState(5); 
   const [expanded, setExpanded] = useState([]);

  const handleClick = (index) => {
    setExpanded((prevState) => {
      const updatedExpanded = [...prevState];
      updatedExpanded[index] = !updatedExpanded[index];
      return updatedExpanded;
    });
  };

  const navigate = useNavigate();

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
      const response = await axios.get(`http://localhost:8080/worker/page?page=${page}`, {
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

  return (
    <div className='mobile-container'>
      <div className='title'>
        <span className='title-text'>oo님의 공사 신고 접수 내역</span>
      </div>
      <div>
      <button className="list-logout-button" onClick={handleLogout}>
        <img className="list-logout-button-detail" src={process.env.PUBLIC_URL + '/logout.svg'} alt="Logout"/>
      </button>
      </div>

      <div>
        <button className="external-refresh-button" onClick={handleRefresh}>
          <img className="voc-img" alt="Element" src={process.env.PUBLIC_URL + "/refresh-arrow.png"} />
        </button>
      </div>
      <hr />
      <Link to={"/externalreceipt"}><button className='receipt-button'>공사 신고 접수</button></Link>
      <hr />
      <div className='list-content'>
        <div className='sub-title'>
          <span className='sub-title'>접수 목록</span>
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
