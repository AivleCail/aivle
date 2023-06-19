import React from 'react';

const IntroTableRow = ({ children, className }) => {
  return (
    <tr className={`intro-table-row ${className}`}>
      {
        children
      }
    </tr>
  )
}

export default IntroTableRow;
