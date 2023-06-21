import React from 'react';

const ArticalContent = ({ article, comments }) => {
  return (
    <div className="modal-artical">
      <h2>{article.articleTitle}</h2>
      <p>{article.articleBody}</p>
      <br />
      <p>{article.managerName} {article.updatedAt}</p>

      <div className="article-comment">
        <h3>Comment</h3>
        {comments && comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <li key={comment.commentId} className="article-comment-one">
                <h4>{comment.managerName}</h4>
                <p>{comment.commentText}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>댓글이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ArticalContent;
