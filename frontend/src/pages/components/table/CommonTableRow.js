import React from 'react';

const CommonTableRow = ({ onClick, children, className }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <tr className={`common-table-row ${className}`} onClick={handleClick}>
      {children}
    </tr>
  );
};

export default CommonTableRow;
