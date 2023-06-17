import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import './articlelist.css';
import axios from 'axios';
import CommonTable from '../../components/table/CommonTable';
import CommonTableColumn from '../../components/table/CommonTableColumn';
import CommonTableRow from '../../components/table/CommonTableRow';
import Paging from '../page/paging';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(8);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const articlesData = [];
      let id = 1;
      let articleExists = true;

      while (articleExists) {
        try {
          const response = await axios.get(`http://localhost:8080/article/one?id=${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          articlesData.unshift(response.data); // Add response.data to the beginning of the array
          id++;
        } catch (error) {
          articleExists = false;
        }
      }

      setArticles(articlesData);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  // Pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="article-container">
      <Header />
      <Sidebar />

      <div className="background">
        <div className="container">
          <span className="article-text-1">공지사항</span>
          <span className="article-text-2">공지사항을 빠르고 정확하게 안내해드립니다.</span>

          <div className="article">
            <CommonTable headersName={['번호', '제목', '글쓴이', '작성일시', '조회']}>
              {currentArticles.map((article) => (
                <CommonTableRow key={article.articleId}>
                  <CommonTableColumn>{article.articleId}</CommonTableColumn>
                  <CommonTableColumn>{article.articleTitle}</CommonTableColumn>
                  <CommonTableColumn>{article.managerName}</CommonTableColumn>
                  <CommonTableColumn>{article.createdAt}</CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                </CommonTableRow>
              ))}
            </CommonTable>
          </div>
          <Paging
            articlesPerPage={articlesPerPage}
            totalArticles={articles.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
