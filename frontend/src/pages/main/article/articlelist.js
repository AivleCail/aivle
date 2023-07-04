import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer';
import './articlelist.css';
import axios from 'axios';
import CommonTable from '../../components/table/CommonTable';
import CommonTableColumn from '../../components/table/CommonTableColumn';
import CommonTableRow from '../../components/table/CommonTableRow';
import Paging from '../page/paging';
import Modal from '../../components/modal/Modal';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    fetchArticles();
    const interval = setInterval(fetchArticles, 2000); 

    return () => {
      clearInterval(interval);
    };
  }, []);


  const fetchArticles = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const articlesData = [];

      let page = 1;
      let articleExists = true;

      while (articleExists) {
        try {
          const response = await axios.get(`${API_URL}8080/article/page?page=${page}`, {
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

      const noticeArticles = articlesData.filter(article => article.category === '공지');
      const generalArticles = articlesData.filter(article => article.category !== '공지');
      const sortedArticles = [...noticeArticles, ...generalArticles];

       setArticles(sortedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };
  
  

  // Modal Open
  const openModal = async (article) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      // Article 정보 가져오기
      const response = await axios.get(`${API_URL}8080/article/one?id=${article.articleId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const detailedArticle = response.data;

      // 댓글 정보 가져오기
      const commentResponse = await axios.get(`${API_URL}8080/comment/list?id=${article.articleId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const comments = commentResponse.data;

      // Article 정보와 댓글 정보를 합쳐서 선택된 article에 comments 필드 추가
      const articleWithComments = { ...detailedArticle, comments };

      setSelectedArticle(articleWithComments);
      setIsOpenModal(true);
    } catch (error) {
      console.error('Error fetching article details:', error);
    }
  };
  // Model Close
  const closeModal = () => {
    setSelectedArticle(null);
    setIsOpenModal(false);
  };

  //create article Modal Close
  const openModals = () => {
    setIsModalOpen(true);
  };

  const closeModals = () => {
    setIsModalOpen(false);
  };


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  

  

  return (
    <div class="web-layout">
      <Sidebar />
    <div className="right-container">
      <Header />
        <div className="main-background">
          <div className="article-container">
            <div className = "article-top-container">
              <div className = "article-text-1"><span>커뮤니티</span></div>
              <div className = "article-text-2"><span>공지사항 & 운영자들 간 소통 게시판입니다.</span>
                <button className='article-create-btn' onClick={() => openModals()}>글쓰기</button>
              </div>
            </div>

            <div className="article-mid-container">
              <CommonTable headersName={['카테고리', '제목', '글쓴이', '작성 일시', '조회수', '추천수']} columnWidths={['6%','', '15%', '15%', '5%', '5%']}>
                {currentArticles.map((article) => (
                  <CommonTableRow
                    key={article.articleId}
                    onClick={() => openModal(article)}
                    className={article.category === '공지' ? 'notice-row' : '' }
                  >
                    <CommonTableColumn>{article.category}</CommonTableColumn>
                    <CommonTableColumn className='article-title-col'>{article.articleTitle}</CommonTableColumn>
                    <CommonTableColumn className='article-name-col'>
                      {article.managerName.length > 1 ? `${article.managerName.charAt(0)}*${article.managerName.slice(-1)}` : article.managerName}
                    </CommonTableColumn>
                    <CommonTableColumn>{article.createdAt.substring(0, 16)}</CommonTableColumn>
                    <CommonTableColumn>{article.count}</CommonTableColumn>
                    <CommonTableColumn>{article.likeCount}</CommonTableColumn>
                  </CommonTableRow>
                ))}
              </CommonTable>
            </div>



            <div className="article-bottom-container">
                  <Paging
                    articlesPerPage={articlesPerPage}
                    totalArticles={articles.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
            </div>

            {/* ArticleDetailModal */}
              {isOpenModal && (
              <Modal isOpen={isOpenModal} closeModal={closeModal} entity="article" article={selectedArticle} comments={selectedArticle.comments}/>
            )}
            {isModalOpen && (
              <Modal isOpen={isModalOpen} closeModal={closeModals} entity="articleCreate" />
            )}
        </div>
      </div>
      <Footer />
    </div>
  </div>
  );
};

export default ArticleList;
