import React, { useState } from 'react';
import './List.css';

const ListItem = ({ handleComplete, completed, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
    handleComplete(index);
  };

  return (
    <li className={`li ${isExpanded ? 'expanded' : ''}`} onClick={handleClick}>
      <div className='li-content'>
        <div className='li-top'>
          <span>한국가스공사</span>
          <button onClick={handleButtonClick} disabled={completed} className='external_status'>
            {completed ? '공사 완료' : '공사중'}
          </button>
        </div>
        <div className='li-body'>
          <span>부산광역시 강서구 명지동 명지오션시티11로 22</span>
        </div>
        <div className='li-bottom'>
          <span>공사 시작 시간: 2023.06.15 13:00</span>
          <span>공사 종료 시간: 2023.06.15 18:00</span>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
