import React, { useEffect } from 'react';
import './Modal.css';
import ArticleContent from './ArticleContent';
import VocContent from './VocContent';
import WorkerContent from './WorkerContent';
import UserInfoContent from './UserInfoContent';
import UserYakwan from './UserYakwan';
import ArticleCreate from './ArticleCreate';
import VocCreate from './VocCreate';

const Modal = ({ isOpen, closeModal, entity, article, comments, voc, worker, userInfo, userInfo2 }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains('modal')) {
        closeModal();
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOpen, closeModal]);

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          <img src={process.env.PUBLIC_URL + "xicon1.png"} alt="Close" />
        </button>
        {entity === 'article' && <ArticleContent article={article} comments={comments} isOpen={isOpen} closeModal={closeModal}/>}
        {entity === 'voc' && <VocContent voc={voc} />}
        {entity === 'worker' && <WorkerContent worker={worker} />}
        {entity === 'userInfo' && <UserInfoContent closeModal={closeModal}/> }
        {entity === 'userInfo2' && <UserYakwan closeModal={closeModal}/> }
        {entity === 'articleCreate' && <ArticleCreate closeModal={closeModal}/>}
        {entity === 'vocCreate' && <VocCreate closeModal={closeModal}/>}
      </div>
    </div>
  );
};

export default Modal;