import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';
import './worker.css';
import CommonTable from '../components/table/CommonTable';
import CommonTableColumn from '../components/table/CommonTableColumn';
import CommonTableRow from '../components/table/CommonTableRow';
import Paging from './page/paging';
import axios from 'axios';
import Modal from '../components/modal/Modal';
import { useNavigate } from 'react-router-dom';

const Worker = () => {
  const [workerList, setWorkerList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [workerPerPage] = useState(8);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  useEffect(() => {
    fetchWorkerList();
  },[]);


  const fetchWorkerList = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const page = currentPage;
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

  // Modal Open
   const openModal = async (worker) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      // Article 정보 가져오기
      const response = await axios.get(`http://localhost:8080/external/one?id=${worker.externalId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const detailedWorker = response.data;

      setSelectedWorker(detailedWorker);
      setIsOpenModal(true);
    } catch (error) {
      console.error('Error fetching worker details:', error);
    }
  };

  // Model Close
  const closeModal = () => {
    setSelectedWorker(null);
    setIsOpenModal(false);
  };

  return (
    <div className="worker-container">
      <Header />
      <Sidebar />
      <div className="background">
        <div className="container">
          <span className="worker-text-1">사외공사 관리</span>
          <span className="worker-text-2">협력체 공사 신고 접수 내용을 확인합니다.</span>

          <div className="worker">
            <CommonTable headersName={['번호', '업체명', '공사 주소', '공사시작시간', '접수시간', '완료여부']}
            columnWidths={['5%', '10%', '20%', '13%', '13%','5%']}>
              {currentWorkerList.map((worker) => (
                <CommonTableRow key={worker.externalId} onClick={() => openModal(worker)}>
                  <CommonTableColumn>{worker.externalId}</CommonTableColumn>
                  <CommonTableColumn>{worker.companyName}</CommonTableColumn>
                  <CommonTableColumn>{`${worker.externalAddress.split(' ').slice(0, 3).join(' ')}`}</CommonTableColumn>
                  <CommonTableColumn>{worker.externalStartdate}</CommonTableColumn>
                  <CommonTableColumn>{worker.receiptDate}</CommonTableColumn>
                  <CommonTableColumn>{worker.externalStatus}</CommonTableColumn>
                </CommonTableRow>
              ))}
            </CommonTable>
          </div>

          {/* ArticleDetailModal */}
          {isOpenModal && (
            <Modal isOpen={isOpenModal} closeModal={closeModal} entity="worker" worker={selectedWorker}/>
          )}

          <Paging
            articlesPerPage={workerPerPage}
            totalArticles={workerList.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Worker;
