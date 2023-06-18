import React, { useState } from 'react';
import './List.css';
import ListItem from './ListItem';

const ListContainer = (props) => {
  const numbers = props.numbers;
  const [completed, setCompleted] = useState(Array(numbers.length).fill(false));

  const handleComplete = (index) => {
    const confirmCancel = window.confirm('공사 완료 상태로 변경하시겠습니까?');

    if (confirmCancel) {
      setCompleted((prevState) => {
        const updatedCompleted = [...prevState];
        updatedCompleted[index] = true;
        return updatedCompleted;
      });
    }
  };

  const listItems = numbers.map((number, index) => (
    <ListItem
      key={index}
      number={number}
      handleComplete={handleComplete}
      completed={completed[index]}
      index={index}
    />
  ));

  return <ul className="ul">{listItems}</ul>;
};

export default ListContainer;