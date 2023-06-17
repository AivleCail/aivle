import React, { useState } from 'react';
import './List.css';
import ListItem from './ListItem';

const ListContainer = (props) => {
  const numbers = props.numbers;
  const [values, setValues] = useState(Array(numbers.length).fill('펼치기'));
  const [isExpanded, setIsExpanded] = useState(Array(numbers.length).fill(false));
  const [completed, setCompleted] = useState(Array(numbers.length).fill(false));

  const handleChangeValue = (index) => {
    setValues((prevState) => {
      const updatedValues = [...prevState];
      updatedValues[index] = prevState[index] === '펼치기' ? '접기' : '펼치기';
      return updatedValues;
    });

    setIsExpanded((prevState) => {
      const updatedExpanded = [...prevState];
      updatedExpanded[index] = !prevState[index];
      return updatedExpanded;
    });
  };

  const handleComplete = (index) => {
    setCompleted((prevState) => {
      const updatedCompleted = [...prevState];
      updatedCompleted[index] = true;
      return updatedCompleted;
    });

    alert(`공사 완료 상태로 변경하시겠습니까?`);
  };

  const listItems = numbers.map((number, index) => (
    <ListItem
      key={index}
      number={number}
      isExpanded={isExpanded[index]}
      handleChangeValue={handleChangeValue}
      handleComplete={handleComplete}
      value={values[index]}
      completed={completed[index]}
      index={index}
    />
  ));

  return <ul className="ul">{listItems}</ul>;
};

export default ListContainer;
