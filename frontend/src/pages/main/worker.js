import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import './worker.css';
import CommonTable from '../components/table/CommonTable';
import CommonTableColumn from '../components/table/CommonTableColumn';
import CommonTableRow from '../components/table/CommonTableRow';
import Paging from './page/paging';
import axios from 'axios';

const Worker = () => {
  const [workerList, setWorkerList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [workerPerPage] = useState(8);

  useEffect(() => {
    fetchWorkerList();
  }, []);

  const fetchWorkerList = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const page = currentPage - 1;
      const response = await axios.get(`http://localhost:8080/external/page?page=${page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const workerListData = response.data.content;
      setWorkerList(workerListData);
    } catch (error) {
      console.error('Error fetching worker list:', error);
    }
  };

  const indexOfLastWorker = currentPage * workerPerPage;
  const indexOfFirstWorker = indexOfLastWorker - workerPerPage;
  const currentWorkerList = workerList.slice(indexOfFirstWorker, indexOfLastWorker);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="worker-container">
      <Header />
      <Sidebar />
      <div className="background">
        <div className="container">
          <span className="worker-text-1">사외공사 관리</span>
          <span className="worker-text-2">협력체의 장애 신고 접수내용을 확인합니다.</span>

          <div className="worker">
            <CommonTable
              headersName={['번호', '업체명', '공사 주소', '공사시작시간', '접수시간','ID', '완료여부']}
              columnWidths={['5%', '10%', '20%', '12%', '12%', '10%', '5%']}
            >
              {currentWorkerList.map((worker) => (
                <CommonTableRow key={worker.externalId}>
                  <CommonTableColumn>{worker.externalId}</CommonTableColumn>
                  <CommonTableColumn className="left-align">{worker.companyName}</CommonTableColumn>
                  <CommonTableColumn className="left-align">{worker.externalAddress}</CommonTableColumn>
                  <CommonTableColumn>{worker.externalStartdate}</CommonTableColumn>
                  <CommonTableColumn>{worker.receiptDate}</CommonTableColumn>
                  <CommonTableColumn className="left-align">{worker.managerId}</CommonTableColumn>
                  <CommonTableColumn>{worker.externalStatus}</CommonTableColumn>
                </CommonTableRow>
              ))}
            </CommonTable>
          </div>

          <Paging
            articlesPerPage={workerPerPage}
            totalArticles={workerList.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Worker;
