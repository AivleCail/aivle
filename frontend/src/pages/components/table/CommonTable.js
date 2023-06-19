import React from 'react';
import './CommonTable.css';

const CommonTable = props => {
  const { headersName, children, columnWidths } = props;

  return (
    <table className="common-table">
      <thead>
        <tr>
          {headersName.map((item, index) => (
            <td
              className="common-table-header-column"
              key={index}
              style={{ width: columnWidths ? columnWidths[index] : 'auto' }} // 컬럼 너비 설정
            >
              {item}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default CommonTable;
