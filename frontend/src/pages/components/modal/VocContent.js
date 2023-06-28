import React from "react";
import "./VocContent.css";

const VocContent = ({ voc }) => {
  return (
    <div className="report-container">
      <div>
        <img className="voc-icon-img" alt="Element" src={process.env.PUBLIC_URL + '/login_id.png'} />
        <p>
          <h3 className='voc-id'>VOC {voc.vocId}번</h3>
          <h1 className='voc-name'>{voc.customerName.length > 1 ? `${voc.customerName.charAt(0)}*${voc.customerName.slice(-1)}` : voc.customerName}</h1>
        </p>
        <p className="voc-name-1">고객님</p>
        <p className="voc-phone">{voc.customerPhone.replace(/(\d{3})-(\d{1})(\d{3})-(\d{4})/, '$1-$2***-$4')}</p>
      </div>
      <table>
        <tbody>
          <tr>
            <td>
              <tr className='trl'>
                <img className="voc-number-icon" alt="Element" src={process.env.PUBLIC_URL + '/voc-number-icon.png'} />
                지역
              </tr>
              <tr className="trl-voc">{voc.customerAddress}</tr>
            </td>
            <td>
              <tr className='trl'>
                <img className="voc-number-icon" alt="Element" src={process.env.PUBLIC_URL + '/voc-number-icon.png'} />
                접수일시
              </tr>
              <tr className="trl-voc">{voc.receptionDate}</tr>
            </td>
          </tr>
          <tr>
            <td>
              <tr className='trl'>
                <img className="voc-number-icon" alt="Element" src={process.env.PUBLIC_URL + '/voc-number-icon.png'} />
                장애유형
              </tr>
              <tr className="trl-voc">{voc.type}</tr>
            </td>
            <td>
              <tr className='trl'>
                <img className="voc-number-icon" alt="Element" src={process.env.PUBLIC_URL + '/voc-number-icon.png'} />
                상태
              </tr>
              <tr className="trl-voc">{voc.percentage !== "빈값입니다" ?voc.checkStatus + ` (신뢰도 : ${voc.percentage})` : voc.checkStatus}</tr>
            </td>
          </tr>
          <tr>
            <tr className='trl'>
              <img className="voc-number-icon" alt="Element" src={process.env.PUBLIC_URL + '/voc-number-icon.png'} />
              초기접수내용
            </tr>
            <tr className="trl-voc">{voc.opinion}</tr>
          </tr>
          
          {voc.percentage !== "빈값입니다" && (
            <>
              <tr>
                <tr className='trl'>
                  <img className="voc-number-icon" alt="Element" src={process.env.PUBLIC_URL + '/voc-number-icon.png'} />
                  전체 TM 내용
                </tr>
                <tr className="trl-voc">{voc.entire}</tr>
              </tr>
              <tr>
                <tr className='trl'>
                  <img className="voc-number-icon" alt="Element" src={process.env.PUBLIC_URL + '/voc-number-icon.png'} />
                  TM 추가사항
                </tr>
                <tr className="trl-voc">{voc.statusDetail}</tr>
              </tr>
            </>
          )}
          </tbody>
      </table>
    </div>
  );
};

export default VocContent;