import React, { useState, useEffect } from "react";
import "./css/createarticle.css";
import axios from 'axios';
import { API_URL } from "../../config";
const CreateArticleList = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const articlesData = [];
      let id = 1;
      let articleExists = true;
  
      while (articleExists) {
        try {
          const response = await axios.get(
            `${API_URL}8080/article/`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          articlesData.push(response.data);
          id++;
        } catch (error) {
          articleExists = false;
        }
      }
  
      setArticles(articlesData);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };
  
  
  

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
        fetchArticles();
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
          placeholder="제목"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="본문"
          value={body}
          onChange={handleBodyChange}
        ></textarea>
        <input
          type="text"
          placeholder="카테고리"
          value={category}
          onChange={handleCategoryChange}
        />
        <button type="submit">업로드</button>
      </form>

      <h2>게시물 목록</h2>
      <div>
  {articles.map((article) => (
    <div>
      <p>{article.articleId}</p>
      <p>{article.articleTitle}</p>
      <p>{article.managerName}</p>
      <p>{article.createdAt}</p>
      <p>{article.cateogry}</p>
    </div>
  ))}
</div>


    </div>
  );
};

export default CreateArticleList;
