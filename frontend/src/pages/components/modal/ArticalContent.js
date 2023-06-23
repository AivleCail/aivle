import React, { useState, useEffect } from 'react';  
import axios from 'axios';
import './ArticalContent.css'

const ArticalContent = ({ article, comments }) => {

  const [newCommentText, setNewCommentText] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(article);
  const [articleComments, setArticleComments] = useState(comments); //추가
  const [curManager, setCurManager] = useState(null);

  useEffect(() => {
    setArticleComments(comments);
  }, [comments]);

  useEffect(() => {
    const fetchCurManager = async () => {
      try {
        
        const accessToken = localStorage.getItem('accessToken');
    
        const response = await axios.get('http://localhost:8080/member/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const curManagerData = response.data;
        setCurManager(curManagerData);
      } catch (error) {
        console.error('Error fetching current manager:', error);
      }
    };
    fetchCurManager();
  }, []);
  console.log(curManager);
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

  const handleDeleteComment = async (commentId) => {
    const check = window.confirm("해당 댓글을 삭제하시겠습니까?");
      if (!check) {
        return;
      }
    try {
      const accessToken = localStorage.getItem('accessToken');
        await axios.delete(`http://localhost:8080/comment/one?id=${commentId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      
      setSelectedArticle((prevArticle) => ({
        ...prevArticle,
        comments: prevArticle.comments.filter((comment) => comment.commentId !== commentId),
      }));

      setArticleComments((prevComments) => prevComments.filter((comment) => comment.commentId !== commentId));

      window.alert("삭제가 완료되었습니다.");
    } catch (error) {
      console.error('Error deleting comment:', error);
    }

  };

  return (
    <div className="article-total">
      <div className='title-group'>
        <h2>{article.articleTitle}</h2>
        <button className="edit-button">
          <img src={process.env.PUBLIC_URL + "editicon.svg"} alt="Update"/>
        </button>
      </div>
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
                <div className="comment-line">
                  <h4>{comment.managerName}</h4>
                  <div className="right">
                    <p>{new Date(comment.createdAt).toLocaleString({ year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                    {curManager && comment.managerId === curManager.managerId ? (
                      <button className="delete-button" onClick={() => handleDeleteComment(comment.commentId)}>
                        <img src={process.env.PUBLIC_URL + "deleteico.svg"} alt="Delete" />
                      </button>
                    ) : null}
                  </div>
                </div>
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
