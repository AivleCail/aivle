import React from 'react';

const ListItem = ({ number, isExpanded, handleChangeValue, handleComplete, value, completed, index }) => {
  return (
    <li className={`li ${isExpanded ? 'expanded' : ''}`}>
      <span>{number}</span>
      <div className="buttons">
        <button onClick={() => handleChangeValue(index)}>{value}</button>
        <button onClick={() => handleComplete(index)} disabled={completed}>
          {completed ? '종료' : '공사완료'}
        </button>
      </div>
    </li>
  );
};

export default ListItem;