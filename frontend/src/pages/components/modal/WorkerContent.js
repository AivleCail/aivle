import React, { useState } from "react";
import './WorkerContent.css'

const WorkerContent = ({ worker }) => {
    return (
        <div className="report-container">
          <h2>사외공사 {worker.externalId}번 상세 내역</h2>
          <table>
            <tbody>
              <tr>
                <td className='tdl'>회사명</td>
                <td>{worker.companyName}</td>
              </tr>
              <tr>
                <td className='tdl'>접수내역</td>
                <td>{worker.receiptContent}</td>
              </tr>
              <tr>
                <td className='tdl'>공사위치</td>
                <td>{worker.externalAddress}</td>
              </tr>
              <tr>
                <td className='tdl'>공사시작일시</td>
                <td>{worker.externalStartdate}</td>
              </tr>
              <tr>
                <td className='tdl'>공사종료일시</td>
                <td>{worker.externalEnddate}</td>
              </tr>
              <tr>
                <td className='tdl'>진행상태</td>
                <td>{worker.externalStatus}</td>
              </tr>
              <tr>
                <td className='tdl'>접수일시</td>
                <td>{worker.receiptDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
    );
};

export default WorkerContent;