import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '../icons/Icons';
import ListBody from './ListBody';
import './List.css';

const ListItem = ({ handleComplete, completed, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  const handleClick = () => {
    setIsExpanded((prevState) => !prevState);
    setIsToggled(!isToggled);
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
          <div className='li-buttons'>
            <button onClick={handleButtonClick} disabled={completed} className='external_status'>
              {completed ? '공사 완료' : '공사중'}
            </button>
            {isToggled ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </div>
        </div>
        {isExpanded ? null : <ListBody />}
      </div>
    </li>
  );
};

export default ListItem;