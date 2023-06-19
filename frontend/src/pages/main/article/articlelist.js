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

      let page = 1;
      let articleExists = true;

      while (articleExists) {
        try {
          const response = await axios.get(`http://localhost:8080/article/page?page=${page}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const fetchedArticles = response.data.content;

          if (fetchedArticles.length > 0) {
            articlesData.push(...fetchedArticles);
            page++;
          } else {
            articleExists = false;
          }
        } catch (error) {
          articleExists = false;
          console.error('Error fetching articles:', error);
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
            <div className="article-table-container">
              <div className="article-table-scroll">
                <CommonTable headersName={['번호', '제목', '글쓴이', '작성일시', '조회수']}>
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
            </div>
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
