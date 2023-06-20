import React from 'react';

const ArticleDetailModal = ({ isOpen, closeModal, article, comments }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <p>번호 : {article.articleId}</p>
        <p>카테고리 : {article.category}</p>
        <h2>{article.articleTitle}</h2>
        <p>{article.articleBody}</p>
        <br></br>
        <p>{article.managerName} {article.updatedAt}</p>

        <h3>댓글</h3>
        {comments && comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <li key={comment.commentId}>
                <p>닉네임 : {comment.managerName}</p>
                <p>{comment.commentText}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>댓글이 없습니다.</p>
        )}
        <button onClick={closeModal}>CLOSE</button>
      </div>
    </div>
  );
};

export default ArticleDetailModal;