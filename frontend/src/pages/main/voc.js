import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import './voc.css';
import axios from 'axios';
import CommonTable from '../components/table/CommonTable';
import CommonTableColumn from '../components/table/CommonTableColumn';
import CommonTableRow from '../components/table/CommonTableRow';
import Paging from './page/paging';

const VOC = () => {
  const [vocList, setVocList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [vocPerPage] = useState(8);

  useEffect(() => {
    fetchVocList();
  }, []);

  const fetchVocList = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const vocListData = [];
      let id = 1;
      let vocExists = true;

      while (vocExists) {
        try {
          const response = await axios.get(`http://localhost:8080/voc/one?id=${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          vocListData.unshift(response.data); // Add response.data to the beginning of the array
          id++;
        } catch (error) {
          vocExists = false;
        }
      }

      setVocList(vocListData);
    } catch (error) {
      console.error('Error fetching VOC list:', error);
    }
  };

 
  const indexOfLastVoc = currentPage * vocPerPage;
  const indexOfFirstVoc = indexOfLastVoc - vocPerPage;
  const currentVocList = vocList.slice(indexOfFirstVoc, indexOfLastVoc);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRefresh = () => {
    fetchVocList(); 
  };

  return (
    <div className="voc-container">
      <Header />
      <Sidebar />

      <div className="background">
        <div className="container">
          <span className="voc-text-1">VOC 내역</span>
          <span className="voc-text-2">고객들의 장애 조치 여부를 확인합니다.</span>
          <button className="refresh-button" onClick={handleRefresh}>
            <img className="voc-img" alt="Element" src={process.env.PUBLIC_URL + "/refresh-arrow.png"} />
          </button>

          <div className="board">
            <CommonTable headersName={['번호', '고객명', '지역', '전화번호', '장애유형', '접수 일시', '조치여부']}>
              {currentVocList.map((voc) => (
                <CommonTableRow key={voc.vocId}>
                  <CommonTableColumn>{voc.vocId}</CommonTableColumn>
                  <CommonTableColumn>{voc.customerName}</CommonTableColumn>
                  <CommonTableColumn>{voc.customerAddress}</CommonTableColumn>
                  <CommonTableColumn>{voc.customerPhone}</CommonTableColumn>
                  <CommonTableColumn>{voc.type}</CommonTableColumn>
                  <CommonTableColumn>{voc.receptionDate}</CommonTableColumn>
                  <CommonTableColumn>{voc.checkStatus}</CommonTableColumn>
                </CommonTableRow>
              ))}
            </CommonTable>
          </div>



          <Paging
            articlesPerPage={vocPerPage}
            totalArticles={vocList.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );

};

export default VOC;
