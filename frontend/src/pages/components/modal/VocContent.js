import React from "react";
import "./VocContent.css";

const VocContent = ({ voc }) => {
  return (
    <div className="report-container">
      <h2>VOC {voc.vocId}번 상세 내역</h2>
      <table>
        <tbody>
          <tr>
            <td className='tdl'>고객명</td>
            <td>{voc.customerName}</td>
          </tr>
          <tr>
            <td className='tdl'>지역</td>
            <td>{voc.customerAddress}</td>
          </tr>
          <tr>
            <td className='tdl'>전화번호</td>
            <td>{voc.customerPhone}</td>
          </tr>
          <tr>
            <td className='tdl'>장애유형</td>
            <td>{voc.type}</td>
          </tr>
          <tr>
            <td className='tdl'>접수일시</td>
            <td>{voc.receptionDate}</td>
          </tr>
          <tr>
            <td className='tdl'>접수내용</td>
            <td>{voc.entire}</td>
          </tr>
          <tr>
            <td className='tdl'>추가의견</td>
            <td>{voc.opinion}</td>
          </tr>
          <tr>
            <td className='tdl'>상태</td>
            <td>{voc.checkStatus}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VocContent;