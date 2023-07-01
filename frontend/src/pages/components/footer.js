import React, { useState } from 'react';
import Modal from '../components/modal/Modal';
import './footer.css';


const Footer = () => {
  
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);

  const openModal = () => {
    try {
      setIsOpenModal(true);
    } catch (error) {
      console.error('Error fetching voc details:', error);
    }
  };

  const openModal2 = () => {
    try {
      setIsOpenModal2(true);
    } catch (error) {
      console.error('Error fetching voc details:', error);
    }
  };

  // Modal Close
  const closeModal = () => {
    setIsOpenModal(false);
  };

  const closeModal2 = () => {
    setIsOpenModal2(false);
  };
  return (
    <div className="footer">
      <div className='footer-modal-link'>
        <label className='content-secure'><strong onClick={openModal}>개인정보 처리방침</strong></label>
        {isOpenModal && (
        <Modal isOpen={isOpenModal} closeModal={closeModal} entity="userInfo"/>
      )}  
        <label className='content-secure'><strong onClick={openModal2}>이용약관</strong></label>
        {isOpenModal2 && (
        <Modal isOpen={isOpenModal2} closeModal={closeModal2} entity="userInfo2"/>
      )}
      </div>
      <div>
        <div className ='copyright'>copyright© AIVLE 부산/경남 37조</div>
      </div>
    </div>
  );
};

export default Footer;