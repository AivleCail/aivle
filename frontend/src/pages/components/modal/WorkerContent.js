import React, { useState } from "react";
import './WorkerContent.css'

const WorkerContent = ({ worker }) => {
    return (
        <div> 
          <p>회사명 : {worker.companyName}</p>
          <p>접수내역 : {worker.receiptContent}</p>
          <p>공사주소 : {worker.externalAddress}</p>
          <p>공사시작일시 : {worker.externalStartdate}</p>
          <p>공사종료일시 : {worker.externalEnddate}</p>
          <p>공사상태 : {worker.externalStatus}</p>
          <p>접수일시 : {worker.receiptDate}</p>
        </div>
    );
};

export default WorkerContent;