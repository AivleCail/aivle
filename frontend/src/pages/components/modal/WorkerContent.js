import React, { useState } from "react";
import './WorkerContent.css'

const WorkerContent = ({ worker }) => {
    return (
        <div className="report-container">
          <div>
            <img className="worker-icon-img" alt="Element" src={process.env.PUBLIC_URL + '/worker-icon.png'} />
            <p>
              <h3 className='worker-id'>사외공사 {worker.externalId}번</h3>
              <h1 className='worker-name'>{worker.companyName}</h1>
            </p>
            <p className="worker-status">
              {worker.externalStatus === '공사중' || worker.externalStatus === '공사 중' ? (
                <div>
                  <span style={{ background: 'rgba(255, 193, 193, 0.5)' }}>공사중</span>
                </div>
              ) : worker.externalStatus === '공사예정' || worker.externalStatus === '공사 예정' ? (
                <div>
                  <span style={{ background: 'rgba(255, 255, 210, 0.8)' }}>공사예정</span>
                </div>
              ) : worker.externalStatus === '공사완료' || worker.externalStatus === '공사 완료' ? (
                <div>
                  <span style={{ background: 'rgba(200, 255, 200, 0.6)' }}>공사완료</span>
                </div>
              ) : null}
            </p>
          </div>
          <table>
            <tbody>
              <tr>
                <tr className='trl'>
                  <img className="worker-number-icon" alt="Element" src={process.env.PUBLIC_URL + '/voc-number-icon.png'} />
                    접수내역
                </tr>
                <tr className="trl-worker">{worker.receiptContent}</tr>
              </tr>
              <tr>
                <tr className='trl'>
                <img className="worker-number-icon" alt="Element" src={process.env.PUBLIC_URL + '/voc-number-icon.png'} />
                  공사위치
                </tr>
                <tr className="trl-worker">{worker.externalAddress}</tr>
              </tr>
              <tr>
                <td>
                  <tr className='trl'>
                  <img className="worker-number-icon" alt="Element" src={process.env.PUBLIC_URL + '/voc-number-icon.png'} />
                    공사시작일시
                  </tr>
                  <tr className="trl-worker">{worker.externalStartdate}</tr>
                </td>
                <td>
                  <tr className='trl'>
                  <img className="worker-number-icon" alt="Element" src={process.env.PUBLIC_URL + '/voc-number-icon.png'} />
                    공사종료일시
                  </tr>
                  <tr className="trl-worker">{worker.externalEnddate}</tr>
                </td>
              </tr>         
              <tr>
                <tr className='trl'>
                <img className="worker-number-icon" alt="Element" src={process.env.PUBLIC_URL + '/voc-number-icon.png'} />
                  접수일시
                </tr>
                <tr className="trl-worker">{worker.receiptDate}</tr>
              </tr>
            </tbody>
          </table>
        </div>
    );
};

export default WorkerContent;