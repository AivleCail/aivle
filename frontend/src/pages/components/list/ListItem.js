import React, { useEffect, useState } from "react";
import UnfoldedListBody from './UnfoldedListBody';
import FoldedListBody from './FoldedListBody';
import axios from 'axios';
import { API_URL } from "../../config";
const ListItem = ({ external, index, expanded, handleClick }) => {

  const getStatusClass = () => {
    if (external.externalStatus === '공사완료' | external.externalStatus === '공사 종료') {
      return 'external-completed';
    } else if (external.externalStatus === '공사중' | external.externalStatus === '공사 중') {
      return 'external-proceeding';
    }
  };

  // useEffect(() => {
  //   changeStatusToStart(); 
  //   const interval = setInterval(changeStatusToStart, 3000); 

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);


  const changeStatusToStart = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const check = window.confirm("공사를 시작하시겠습니까?");
    if(!check) {
      return;
    }

    const accessToken = localStorage.getItem('accessToken');
    axios.post(`${API_URL}8080/worker/start?id=${external.externalId}`, null, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  const changeStatusToComplete = async (event) => {
    event.preventDefault();
    event.stopPropagation();


    if (getStatusClass() === 'external-completed') {
      return;
    }

    const check = window.confirm("공사를 종료하시겠습니까?");
    if(!check) {
      return;
    }

    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    axios.post(`${API_URL}8080/worker/end?id=${external.externalId}`, null, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return (
    <li className={`li ${expanded[index] ? 'expanded' : ''}`} onClick={() => handleClick(index)}>
      <div className='li-content'>
        <div className='li-top'>
          <span>{external.companyName}</span>
          <div className='li-buttons'>
            { external.externalStatus === '공사예정' | external.externalStatus === '공사 예정' ? 
            <button className='external_status external-scheduled' onClick={changeStatusToStart}>{external.externalStatus}</button> :
            <button className={`external_status ${getStatusClass()}`} onClick={changeStatusToComplete}>{external.externalStatus}</button>
          }
          </div>
        </div>
        {expanded[index] ? (
          <UnfoldedListBody external={external} />
        ) : (
          <FoldedListBody external={external} />
        )}
      </div>
    </li>
  );
};


export default ListItem;
