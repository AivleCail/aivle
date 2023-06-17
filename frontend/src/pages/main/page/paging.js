import React, { useState } from "react";
import './paging.css';
import Pagination from "react-js-pagination";

const Paging = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <Pagination
      activePage={page} // 현재 페이지
      itemsCountPerPage={8} // 한 페이지랑 보여줄 아이템 갯수
      totalItemsCount={100} // 총 아이템 갯수
      pageRangeDisplayed={8} // paginator의 페이지 범위
      firstPageText={"«"}
      prevPageText={"‹"} // "이전"을 나타낼 텍스트
      nextPageText={"›"} // "다음"을 나타낼 텍스트
      lastPageText={"»"}
      onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
    />
  );
};

export default Paging;