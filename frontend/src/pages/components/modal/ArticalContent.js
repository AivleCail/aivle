import React, { useState, useEffect } from 'react';  
import axios from 'axios';
import './ArticalContent.css'

const ArticalContent = ({ article, comments }) => {

  const [newCommentText, setNewCommentText] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(article);
  const [articleComments, setArticleComments] = useState(comments); //추가

  useEffect(() => {
    setArticleComments(comments);
  }, [comments]);

  const handleNewCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        'http://localhost:8080/comment/',
        {
          id: article.articleId,
          text: newCommentText,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const newComment = response.data;

      setSelectedArticle((prevArticle) => ({
        ...prevArticle,
        comments: [...prevArticle.comments, newComment],
      }));
      
      

      setArticleComments((prevComments) => [...prevComments, newComment]);

      setNewCommentText('');

    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      <h2>{article.articleTitle}</h2>
      <p>{article.articleBody}</p>
      <br />
      <p>{article.managerName} {article.updatedAt}</p>

      <div className="article-comment">
        <h3>Comment</h3>
        <form onSubmit={handleNewCommentSubmit}>
            <input
              type="text"
              placeholder="댓글을 입력하세요."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="comment-input"
            />
            <button type="submit" className="comment-button">Add Comment</button>
        </form>
        {articleComments && articleComments.length > 0 ? (
          <ul>
            {articleComments.map((comment) => ( //추가
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
