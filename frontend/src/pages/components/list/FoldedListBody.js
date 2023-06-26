import React from "react";

const FoldedListBody = ({ external }) => {
  return (
    <div className='li-body'>
      <div className='li-body-address'>
        <p>{external.externalAddress}</p>
      </div>
      <div className='li-body-date'>
        <span className='date-span'>공사 시작 : {external.externalStartdate.substring(0, 16)}</span>
        <span className='date-span'>공사 종료 : {external.externalEnddate === 'null' ? '' : external.externalEnddate.substring(0, 16)}</span>
      </div>
    </div>
  );
};

export default FoldedListBody;