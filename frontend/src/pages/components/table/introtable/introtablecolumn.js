import React from 'react';

const IntroTableColumn = ({ children, width, className }) => {
  return (
    <td className={`intro-table-column ${className}`} style={{ width }}>
      {children}
    </td>
  );
};

export default IntroTableColumn;