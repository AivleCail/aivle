import React from 'react';

const IntroTableRow = ({ onClick, children }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <tr className='intro-table-row' onClick={handleClick}>
      {
        children
      }
    </tr>
  )
}

export default IntroTableRow;
