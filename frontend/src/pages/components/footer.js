import React, { useState } from 'react';
import Modal from 'react-modal';
import './footer.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  
};

const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="footer">
      <div className="footer-text">
      <span className="content-secure" href="#" onClick={openModal}>
        개인정보 처리방침
      </span>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="개인정보 처리방침"
      >
        <h2>개인정보 처리방침</h2>
        <p>이곳에 개인정보 처리방침 내용을 추가합니다.</p>

        <button className="close-button" onClick={closeModal}>
          <img src={process.env.PUBLIC_URL + "xicon1.png"} alt="Close" />
        </button>
      </Modal>
        <a class="content-secure2" href="http://www.naver.com" target="_blank">이용약관</a>
        <a class="copyright">copyright© AIVLE 부산/경남 37조</a>
      </div>
    </div>
  );
};

export default Footer;