import React, { useState, useEffect } from 'react';  
import axios from 'axios';
import './ArticleContent.css'
import { API_URL } from '../../config';
const ArticleContent = ({ article, comments, isOpen, closeModal,  }) => {

  const [newCommentText, setNewCommentText] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(article);
  const [articleComments, setArticleComments] = useState(comments);
  const [curManager, setCurManager] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(article.articleTitle);
  const [editedBody, setEditedBody] = useState(article.articleBody);
  const [editedCategory, setEditedCategory] = useState(article.category);
  const [isOpenModal, setIsOpenModal] = useState(isOpen);
  const formatKoreanDateTime = (dateTime) => {
    const koreanDateTime = new Date(dateTime);
    koreanDateTime.setHours(koreanDateTime.getHours() + 9); // 한국 시간으로 변경하기 위해 9시간을 더해줍니다.
    return koreanDateTime.toISOString().replace('T', ' ').substr(0, 19);
  };

  const [likeCount, setLikeCount] = useState(article.likeCount);
  const [hasRecommendation, sethasRecommendation] = useState(true);
  const [count, setCount] = useState(article.count);
  const [isRecommended, setIsRecommended] = useState(() => {
    const storedValue = localStorage.getItem('isRecommended');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  


  
    useEffect(() => {
      localStorage.setItem('isRecommended', JSON.stringify(isRecommended));
    }, [isRecommended]);
  

  useEffect(() => {
    const fetchCurManager = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`${API_URL}8080/member/me`, {
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

  useEffect(() => {
    setArticleComments(comments);
    setLikeCount(article.likeCount);
    setCount(article.count);
  }, [comments, article.likeCount, article.count]);
  

  const handleNewCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        `${API_URL}8080/comment/`,
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

  const handleDeleteArticle = async (articleId) => {
    const check = window.confirm("현재 게시글을 삭제하시겠습니까?");
    if(!check) {
      return;
    }
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.delete(`${API_URL}8080/article/one?id=${articleId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      window.alert("게시글 삭제가 완료되었습니다.");
      setIsOpenModal(false);
      closeModal();
    } catch(error) {
      console.error('Error deleting article: ', error);
    }  
  };

  const handleDeleteComment = async (commentId) => {
    const check = window.confirm("해당 댓글을 삭제하시겠습니까?");
      if (!check) {
        return;
      }
    try {
      const accessToken = localStorage.getItem('accessToken');
        await axios.delete(`${API_URL}8080/comment/one?id=${commentId}`, {
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

  const handleUpdateArticle = async () => {
    const check = window.confirm('수정 하시겠습니까?');
      if (!check) {
        return;
      }
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.put(
        `${API_URL}8080/article/`,
        {
          id: article.articleId,
          title: editedTitle,
          body: editedBody,
          category: editedCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      setSelectedArticle((prevArticle) => ({
        ...prevArticle,
        id: article.articleId,
        title: editedTitle,
        body: editedBody,
        category: editedCategory,
      }));
      
      setEditMode(false);
      window.alert("수정 완료되었습니다!")
    } catch (error) {
      console.error('글을 업데이트하는 중 오류 발생:', error);
    }
  };


  
  const handleLike = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      
      const response = await axios.post(
        `${API_URL}8080/recommend/check`, 
         {
          managerId: curManager.managerId,
          articleId: article.articleId,
          likeCount: article.likeCount,
        },
        {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        
      });
      
      const hasRecommendations = response.data;
      sethasRecommendation(hasRecommendations);

      if (hasRecommendations) {
      
        await axios.delete(`${API_URL}8080/recommend/one`, {
          data: {
            managerId: curManager.managerId,
            articleId: article.articleId,
            likeCount: article.likeCount-1,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // window.alert("추천 삭제가 완료되었습니다.");
        setLikeCount((prevCount) => prevCount - 1);
      } else {
        // Like the article
        await axios.post(
          `${API_URL}8080/recommend/`,
          {
            managerId: curManager.managerId,
            articleId: article.articleId,
            likeCount: article.likeCount+1,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        //window.alert("추천 완료되었습니다.");
        setLikeCount((prevCount) => prevCount + 1);
      }
      setIsRecommended(!hasRecommendations); 
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="article-total">
      <div className = 'title-category'>
        <span>{editedCategory}</span></div>
      <div className='title-group'>
        {editMode ? (
          <textarea className='title-edit'
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <h2 className='title-edit-text'>{editedTitle}</h2>
        )}
        <div className = "button-group">
        {curManager && curManager.managerId === article.managerId && (
          editMode ? (
              <button className="edit-button" onClick={handleUpdateArticle}>
              <img src={process.env.PUBLIC_URL + "saveicon.svg"} alt="Update" /></button>
          ) : ( <button className="edit-button" onClick={() => setEditMode(true)}><img src={process.env.PUBLIC_URL + "editicon.svg"} alt="Update" /></button>)
        )}
        {curManager && curManager.managerId === article.managerId && (
          <button className="delete-button" onClick={() => handleDeleteArticle(article.articleId)}>
            <img src={process.env.PUBLIC_URL + "deleteicon.svg"} alt="Delete" />
          </button>
        )}

        </div>
        </div>
        <div className = "title-info">
          <div className = "info-left">
            <span className = "manager-name">{article.managerName}</span>
            <span className = "update-time">{article.updatedAt}</span>
          </div>
          <div className = "info-right"> 
            <span className = "article-count">조회수 {article.count}</span>
          </div>
        </div>
      
      <div className='article-info'>
      </div>
      {editMode ? (
        <textarea className='body-edit'
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
        />
      ) : (
        <p className='body-edit-text'>{editedBody}</p>
      )}
      <br />
      <div className = "article-like">         
            {curManager && curManager.managerId !== article.managerId && (
              
              <button className="recommend-button" onClick={handleLike}>
              {isRecommended ? (
                <img src={process.env.PUBLIC_URL + "heart.svg"} alt="" />
              ) : (
              <img src={process.env.PUBLIC_URL + "noheart.svg"} alt="" />
              )}  
        </button>
        
        )}
           <span className = "recommand-count">좋아요 {likeCount} 개</span> 
          
      </div>

      {editMode ? null :(
        <div className="article-comment">
          <h3>Comment</h3>
          <form onSubmit={handleNewCommentSubmit}>
              <textarea
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
              {articleComments.map((comment) => (
                <li key={comment.commentId} className="article-comment-one">
                  <div className="comment-line">
                    <h4>{comment.managerName}</h4>
                    <div className="right">
                    <p>{formatKoreanDateTime(`${new Date(comment.createdAt).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}`)}</p>
                      {curManager && comment.managerId === curManager.managerId ? (
                        <button className="delete-button" onClick={() => handleDeleteComment(comment.commentId)}>
                          <img src={process.env.PUBLIC_URL + "deleteicon.svg"} alt="Delete" />
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
      )}
    </div>
  );
};

export default ArticleContent;
