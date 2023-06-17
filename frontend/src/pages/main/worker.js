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
      const workerListData = await axios.get('http://localhost:8080/external/one?id=${id}', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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
            <CommonTable headersName={['번호', '업체명', '접수 내용', '공사 주소', '공사예정일', '완료여부']}>
              {currentWorkerList.map((worker) => (
                <CommonTableRow key={worker.workerId}>
                  <CommonTableColumn>{worker.workerId}</CommonTableColumn>
                  <CommonTableColumn>{worker.companyName}</CommonTableColumn>
                  <CommonTableColumn>{worker.receiptContent}</CommonTableColumn>
                  <CommonTableColumn>{worker.externalAddress}</CommonTableColumn>
                  <CommonTableColumn>{worker.externalStartdate}</CommonTableColumn>
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
