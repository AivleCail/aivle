import React, { useState } from "react";
import './VocContent.css'

const VocContent = ({ voc }) => {
    return (
        <div> 
          <p>고객명 : {voc.customerName}</p>
          <p>지역 : {voc.customerAddress}</p>
          <p>전화번호 : {voc.customerPhone}</p>
          <p>장애유형 : {voc.type}</p>
          <p>접수일시 : {voc.date}</p>
          <p>접수내용 : {voc.statusDetail}</p>
          <p>추가의견 : {voc.opinion}</p>
          <p>상태 : {voc.status}</p>
        </div>
    );
};

export default VocContent;