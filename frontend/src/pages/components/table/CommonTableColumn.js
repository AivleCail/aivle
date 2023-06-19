import React from 'react';

const CommonTableColumn = ({ children, width, className }) => {
  return (
    <td className={`common-table-column ${className}`} style={{ width }}>
      {children}
    </td>
  );
};

export default CommonTableColumn;
