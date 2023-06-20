import React from 'react';
import './List.css';
import ListItem from './ListItem';

const ListContainer = ({ currentExternalList, expanded, handleClick }) => {
  return (
    <ul className="ul">
      {currentExternalList.map((external, index) => (
        <ListItem
          key={index}
          external={external}
          index={index}
          expanded={expanded}
          handleClick={handleClick}
        />
      ))}
    </ul>
  );
};

export default ListContainer;
