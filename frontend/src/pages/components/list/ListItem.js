import React from "react";
import UnfoldedListBody from './UnfoldedListBody';
import FoldedListBody from './FoldedListBody';

const ListItem = ({ external, index, expanded, handleClick }) => {
  const getStatusClass = () => {
    if (external.externalStatus === '공사완료') {
      return 'external-completed';
    } else if (external.externalStatus === '공사예정') {
      return 'external-scheduled';
    } else {
      return '';
    }
  };

  return (
    <li className={`li ${expanded[index] ? 'expanded' : ''}`} onClick={() => handleClick(index)}>
      <div className='li-content'>
        <div className='li-top'>
          <span>{external.companyName}</span>
          <div className='li-buttons'>
            <button className={`external_status ${getStatusClass()}`}>{external.externalStatus}</button>
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
