import React from 'react';

const ArticleDetailModal = ({ isOpen, closeModal, article }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <p>번호 : {article.articleId}</p>
        <h2>{article.articleTitle}</h2>
        <p>{article.articleBody}</p>
        <br></br>
        <p>작성자 : {article.managerName}</p>
        <p>작성일 : {article.updatedAt}</p>
        <button onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
};

export default ArticleDetailModal;