import React from "react";
import "./login.css";

export const Login = () => {
  return (
    <div className="login">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-group">
            <div className="group">
              <div className="div-wrapper">
                <input type = "text" className = "text-input" placeholder=  "이메일 입력" />
              </div>
            </div>
            <div className="overlap-group-wrapper">
              <div className="div">
                <input type = "password" className = "text-input" placeholder=  " 비밀번호 입력" />
              </div>
            </div>
            <div className="group-2">
              <button className="login-button">
                로그인
              </button>
            </div>
            <img className="icon-user" alt="Icon user" src="/img/2815428-1.png" />
            <img className="element" alt="Element" src="/img/2592537-1.png" />
            <img className="img" alt="Element" src="/img/1.png" />
          </div>
          <div className="text-wrapper-5">비밀번호 찾기</div>
          <div className="text-wrapper-6">회원가입</div>
          <img className="element-2" alt="Element" src="/img/152990-68997-3726-1.png" />
        </div>
      </div>
    </div>
  );
};
