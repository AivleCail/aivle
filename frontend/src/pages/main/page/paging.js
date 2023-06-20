import React from 'react';
import './paging.css';
import Pagination from 'react-js-pagination';

const Paging = ({ articlesPerPage, totalArticles, currentPage, paginate }) => {
  const handlePageChange = (page) => {
    paginate(page);
  };

  return (
    <div className="pagination-container">
      <Pagination
        key={currentPage}
        activePage={currentPage}
        itemsCountPerPage={articlesPerPage}
        totalItemsCount={totalArticles}
        pageRangeDisplayed={8}
        firstPageText={'«'}
        prevPageText={'‹'}
        nextPageText={'›'}
        lastPageText={'»'}
        onChange={handlePageChange}
        itemClass={(pageNumber) =>
          pageNumber === currentPage ? 'page-item active' : 'page-item'
        }
        innerClass="pagination"
        linkClass="pagination-link"
      />
    </div>
  );
};

export default Paging;
