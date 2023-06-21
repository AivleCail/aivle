import React from 'react';
import './Modal.css';
import ArticalContent from './ArticalContent';

const Modal = ({ isOpen, closeModal, article, comments }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>X</button>
        <ArticalContent article={article} comments={comments} />
      </div>
    </div>
  );
};

export default Modal;
