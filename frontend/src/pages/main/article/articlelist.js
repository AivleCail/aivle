import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import './articlelist.css';
import axios from 'axios';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:8080/articles', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data;
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  return (
    <div className="notice-container">
      <Header />
      <Sidebar />

      <div className="background">
        <div className="container">
          <span className="text-1">공지사항</span>
          <span className="text-2">공지사항을 빠르고 정확하게 안내해드립니다.</span>

          <div className="notice">
            {articles.map((article) => (
              <div key={article.articleId}>
                <h3>{article.articleTitle}</h3>
                <p>{article.updatedAt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
