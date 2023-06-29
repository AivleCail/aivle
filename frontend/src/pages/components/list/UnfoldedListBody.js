import React from "react";

const UnfoldedListBody = ({ external }) => {
  return (
    <div className='li-body'>
      <p>업체명: {external.companyName}</p>
      <p>공사주소: {external.externalAddress}</p>
      <p>공사 내용: {external.receiptContent}</p>
      <p>접수 시간: {external.receiptDate}</p>
      <p>공사 시작 시간: {external.externalStartdate}</p>
      <p>공사 종료 시간: {external.externalEnddate === 'null' ? '' : external.externalEnddate}</p>
    </div>
  );
};

export default UnfoldedListBody;
