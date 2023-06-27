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
import { API_URL } from '../config';

const VOC = () => {
  const [vocList, setVocList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [vocPerPage] = useState(6);
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
    const interval = setInterval(fetchVocList, 3000); 

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setCheckItems([]);
    setSelectedItems([]);
  }, [currentPage]);
  


  const fetchVocList = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_URL}8080/voc/page?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const vocListData = response.data.content;
      vocListData.sort((a, b) => b.vocId - a.vocId); // 내림차순
      setVocList(vocListData);
    } catch (error) {
      console.error('Error fetching VOC list:', error);
    }
  };

  const indexOfLastVoc = currentPage * vocPerPage;
  const indexOfFirstVoc = indexOfLastVoc - vocPerPage;
  const currentVocList = vocList.slice(indexOfFirstVoc, indexOfLastVoc);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  const [checkItems, setCheckItems] = useState([]);

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
      const selectedItem = vocList.find((voc) => voc.vocId === id);
      if (selectedItem) {
        setSelectedItems((prev) => [
          ...prev,
          { to: selectedItem.customerPhone.replace(/-/g, ''), content: `${id}` },
        ]);
      }
    } else {
      setCheckItems((prev) => prev.filter((item) => item !== id));
      setSelectedItems((prev) => prev.filter((item) => item.to !== id));
    }
  };
  
  const handleAllCheck = (checked) => {
    if (checked) {
      const itemsToAdd = currentVocList.filter((voc) => !checkItems.includes(voc.vocId));
      const updatedItems = [...selectedItems, ...itemsToAdd];
      setSelectedItems(updatedItems);
      setCheckItems(currentVocList.map((voc) => voc.vocId));
    } else {
      const itemsToRemove = currentVocList.filter((voc) => checkItems.includes(voc.vocId));
      const updatedItems = selectedItems.filter((item) => !itemsToRemove.some((voc) => voc.vocId === item.to));
      setSelectedItems(updatedItems);
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
      const response = await axios.post(`${API_URL}8080/sms/send`, selectedItems, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert('해당 고객분들께 메세지 전송이 완료 되었습니다!');

      
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };

   // Modal Open
   const openModal = async (voc) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      // Article 정보 가져오기
      const response = await axios.get(`${API_URL}8080/voc/one?id=${voc.vocId}`, {
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
    <div className="web-layout">
      <Sidebar />
      <div className='right-container'>
        <Header />
        <div className = "main-background">
          <div className="voc-container">
            <div className = "voc-top-container">
              <div className = "voc-text-1"><span>VOC 내역</span></div>
              <div className = "voc-text-2"><span>고객들의 장애 조치 여부를 확인합니다.</span>
                <button className="send-button" onClick={handleSend}>조치확인 문자발송</button>
              </div>
            </div>
            <div className="voc-mid-container">
                <CommonTable headersName={[
                  <input 
                    type='checkbox' 
                    name='select-all'
                    onChange={(e) => handleAllCheck(e.target.checked)}
                    checked={checkItems.length === currentVocList.length && currentVocList.length > 0}
                  />
                  ,'번호', '고객명', '지역', '전화번호', '장애유형', '접수 일시', '조치여부']}
                  columnWidths={['3%', '5%', '8%', '18%', '10%', '15%', '10%', '5%']}>
                  {currentVocList.map((voc) => (
                    <CommonTableRow key={voc.vocId} onClick={() => openModal(voc)}>
                      <CommonTableColumn>
                        <div className="voc-checkbox-container">
                          <input 
                            type='checkbox' 
                            name={`select-${voc.vocId}`}
                            onChange={(e) => handleSingleCheck(e.target.checked, voc.vocId)}
                            checked={checkItems.includes(voc.vocId) ? true : false}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </CommonTableColumn>
                      <CommonTableColumn>{voc.vocId}</CommonTableColumn>
                      <CommonTableColumn>{voc.customerName.length > 1 ? `${voc.customerName.charAt(0)}*${voc.customerName.slice(-1)}` : voc.customerName}</CommonTableColumn>
                      <CommonTableColumn>{voc.customerAddress}</CommonTableColumn>
                      <CommonTableColumn>{voc.customerPhone.replace(/(\d{3})-(\d{1})(\d{3})-(\d{4})/, '$1-$2***-$4')}</CommonTableColumn>
                      <CommonTableColumn>{voc.type}</CommonTableColumn>
                      <CommonTableColumn>{voc.receptionDate.slice(0, 16)}</CommonTableColumn>
                      <CommonTableColumn>
                        {voc.checkStatus === '발생' ? (
                          <span style={{ color: 'red', fontWeight:'600' }}>X</span>
                        ) : (
                          <span style={{ color: 'blue', fontWeight:'600' }}>O</span>
                        )}
                      </CommonTableColumn>
                    </CommonTableRow>
                  ))}
                </CommonTable>

                
              <div className = "voc-bottom-container">
                  <Paging
                  articlesPerPage={vocPerPage}
                  totalArticles={vocList.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            </div>


            {/* ArticleDetailModal */}
            {isOpenModal && (
              <Modal isOpen={isOpenModal} closeModal={closeModal} entity="voc" voc={selectedVoc}/>
            )}

          </div>
        </div>
        <Footer />
      </div>
      
      
    </div>
  );

};

export default VOC;
