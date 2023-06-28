import React, { useState } from 'react';  
import axios from 'axios';
import './ArticleCreate.css';
import { API_URL } from '../../config';

const ArticleCreate = ({closeModal}) => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("");

    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };
  
    const handleBodyChange = (e) => {
      setBody(e.target.value);
    };
  
    const handleCategoryChange = (e) => {
      setCategory(e.target.value);
    };
  

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title.trim() === "") {
            alert("제목을 입력해주세요.");
            return;
        }

        if (body.trim() === "") {
            alert("본문을 입력해주세요.");
            return;
        }

        if (category.trim() === "") {
            alert("카테고리을 입력해주세요.");
            return;
        }

        const check = window.confirm('게시물 작성 하기');
        if (!check) {
            return;
        }  
        
  
        const articleData = {
            title,
            body,
            category,
        };
  
  
        axios.post(`${API_URL}8080/article/`, articleData, {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })

            .then((response) => {
            console.log(response.data);
            alert("게시글 작성완료"); 
            closeModal();
            })
            .catch((error) => {
            console.error("Error:", error);
            });
    
    
        setTitle("");
        setBody("");
        setCategory("");
        };
  


    return (
      <div className="create-article-container">
        <h2>게시물 생성</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="제목을 작성해 주세요"
            value={title}
            onChange={handleTitleChange}
          />
          <textarea
            placeholder="본문 내용을 작성해 주세요"
            value={body}
            onChange={handleBodyChange}
          ></textarea>
          <select
            type="text"
            placeholder="카테고리 작성해 주세요"
            value={category}
            onChange={handleCategoryChange}
            >
                <option value="">선택</option>
                <option value="공지">공지</option>
                <option value="일반">일반</option>
            </select>

          <button class = "create-button" type="submit" >업로드</button>
        </form>
        </div>
  );
};

export default ArticleCreate;