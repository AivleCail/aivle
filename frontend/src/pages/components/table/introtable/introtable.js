import React from 'react';
import './introtable.css';

const IntroTable = props => {
  const { headersName, children, columnWidths } = props;

  return (
    <table className="intro-table">
      <thead>
        <tr>
          {headersName.map((item, index) => (
            <td
              className="intro-table-header-column"
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

export default IntroTable;
