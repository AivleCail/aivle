import React, { useState } from "react";
import './UserInfoContent.css'

const UserInfoContent = ({userInfo}) => {
    return (
        <div className="report-container">
          <h2>개인정보처리방침</h2>
          <table>
            <tbody>
              <tr>
                개인정보처리방침 내역입니다.
              </tr>
              
            </tbody>
          </table>
        </div>
    );
};
export default UserInfoContent;