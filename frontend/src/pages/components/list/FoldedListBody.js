import React from "react";

const FoldedListBody = ({ external }) => {
  return (
    <div className='li-body'>
      <div className='li-body-address'>
        <p className='fold-address'>{external.externalAddress}</p>
      </div>
      <div className='li-body-date'>
        <p className='date-span'>공사 시작 : {external.externalStartdate.substring(0, 16)}</p>
        <p className='date-span'>공사 종료 : {external.externalEnddate === 'null' ? '' : external.externalEnddate.substring(0, 16)}</p>
      </div>
    </div>
  );
};

export default FoldedListBody;