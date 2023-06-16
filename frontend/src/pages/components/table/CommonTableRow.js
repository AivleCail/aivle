import React from 'react';

const CommonTableRow = ({ children, className }) => {
  return (
    <tr className={`common-table-row ${className}`}>
      {
        children
      }
    </tr>
  )
}

export default CommonTableRow;
