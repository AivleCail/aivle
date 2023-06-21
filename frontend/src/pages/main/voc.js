import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';
import './voc.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommonTable from '../components/table/CommonTable';
import CommonTableColumn from '../components/table/CommonTableColumn';
import CommonTableRow from '../components/table/CommonTableRow';
import Paging from './page/paging';
import Modal from '../components/modal/Modal';

const VOC = () => {
  const [vocList, setVocList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [vocPerPage] = useState(8);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedVoc, setSelectedVoc] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인 후 이용가능합니다.');
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    fetchVocList();
  },[]);


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
          vocListData.unshift(response.data);
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

  const [checkItems, setCheckItems] = useState([]);

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
      const selectedItem = vocList.find((voc) => voc.vocId === id);
      if (selectedItem) {
        setSelectedItems((prev) => [
          ...prev,
          { to: selectedItem.customerPhone, content: `${id}` },
        ]);
      }
    } else {
      setCheckItems((prev) => prev.filter((item) => item !== id));
      setSelectedItems((prev) => prev.filter((item) => item.to !== id));
    }
  };
  
  const handleAllCheck = (checked) => {
    if (checked) {
      const items = vocList.map((voc) => ({
        to: voc.customerPhone,
        content: `Your message content for ID ${voc.vocId}`,
      }));
      setSelectedItems(items);
      setCheckItems(vocList.map((voc) => voc.vocId));
    } else {
      setSelectedItems([]);
      setCheckItems([]);
    }
  };
  
  const handleSend = async () => {
    if (selectedItems.length === 0) {
      alert('보낼 대상을 체크해주세요.');
      return;
    }
  
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:8080/sms/send', selectedItems, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };

   // Modal Open
   const openModal = async (voc) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      // Article 정보 가져오기
      const response = await axios.get(`http://localhost:8080/voc/one?id=${voc.vocId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const detailedVoc = response.data;

      setSelectedVoc(detailedVoc);
      setIsOpenModal(true);
    } catch (error) {
      console.error('Error fetching voc details:', error);
    }
  };

  // Model Close
  const closeModal = () => {
    setSelectedVoc(null);
    setIsOpenModal(false);
  };

  

  return (
    <div className="voc-container">
      <Header />
      <Sidebar />

      <div className="background">
        <div className="container">
          <span className="voc-text-1">VOC 내역</span>
          <span className="voc-text-2">고객들의 장애 조치 여부를 확인합니다.</span>
          <button className="send-button" onClick={handleSend}>발송</button>
          <button className="refresh-button" onClick={handleRefresh}>
            <img className="voc-img" alt="Element" src={process.env.PUBLIC_URL + "/refresh-arrow.png"} />
          </button>

          <div className="board">
            <CommonTable headersName={[
              <input 
                type='checkbox' 
                name='select-all'
                onChange={(e) => handleAllCheck(e.target.checked)}
                checked={checkItems.length === vocList.length && vocList.length > 0}
              />
              ,'번호', '고객명', '지역', '전화번호', '장애유형', '접수 일시', '조치여부']}
              columnWidths={['3%', '4%', '8%', '20%', '15%', '10%', '20%', '5%']}>
              {currentVocList.map((voc) => (
                <CommonTableRow key={voc.vocId} onClick={() => openModal(voc)}>
                  <CommonTableColumn>
                    <div className="checkbox-container">
                      <input 
                        type='checkbox' 
                        name={`select-${voc.vocId}`}
                        onChange={(e) => handleSingleCheck(e.target.checked, voc.vocId)}
                        checked={checkItems.includes(voc.vocId) ? true : false} 
                      />
                    </div>
                  </CommonTableColumn>
                  <CommonTableColumn>{voc.vocId}</CommonTableColumn>
                  <CommonTableColumn>{voc.customerName}</CommonTableColumn>
                  <CommonTableColumn className="left-align">{voc.customerAddress}</CommonTableColumn>
                  <CommonTableColumn>{voc.customerPhone}</CommonTableColumn>
                  <CommonTableColumn>{voc.type}</CommonTableColumn>
                  <CommonTableColumn>{voc.receptionDate}</CommonTableColumn>
                  <CommonTableColumn>{voc.checkStatus}</CommonTableColumn>
                </CommonTableRow>
              ))}
            </CommonTable>
          </div>

          {/* ArticleDetailModal */}
          {isOpenModal && (
            <Modal isOpen={isOpenModal} closeModal={closeModal} entity="voc" voc={selectedVoc}/>
          )}



          <Paging
            articlesPerPage={vocPerPage}
            totalArticles={vocList.length}
            paginate={paginate}
            currentPage={currentPage}
          />
          
        </div>
      </div>
      <Footer />
    </div>
  );

};

export default VOC;
