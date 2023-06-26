import React from 'react';
import './Modal.css';
import ArticleContent from './ArticleContent';
import VocContent from './VocContent';
import WorkerContent from './WorkerContent';
import UserInfoContent from './UserInfoContent';
import UserYakwan from './UserYakwan';
import ArticleCreate from './ArticleCreate';

const Modal = ({ isOpen, closeModal, entity, article, comments, voc, worker, userInfo,userInfo2}) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          <img src={process.env.PUBLIC_URL + "xicon1.png"} alt="Close" />
        </button>
        {entity === 'article' && <ArticleContent article={article} comments={comments} isOpen={isOpen} closeModal={closeModal}/>}
        {entity === 'voc' && <VocContent voc={voc} />}
        {entity === 'worker' && <WorkerContent worker={worker} />}
        {entity === 'userInfo' && <UserInfoContent/> }
        {entity === 'userInfo2' && <UserYakwan/> }
        {entity === 'null' && <ArticleCreate closeModal={closeModal}/>}
      </div>
    </div>
  );
};

export default Modal;
