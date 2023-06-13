import React from "react";
import "./style.css";

export const Login = () => {
  return (
    <div className="login">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-group">
            <div className="group">
              <div className="div-wrapper">
                <div className="text-wrapper">사원번호 입력</div>
              </div>
            </div>
            <div className="overlap-group-wrapper">
              <div className="div">
                <div className="text-wrapper-2">비밀번호 입력</div>
              </div>
            </div>
            <div className="group-2">
              <div
                className="overlap-2"
                style={{
                  backgroundImage: "url(/img/rectangle-5.png)",
                }}
              >
                <div className="text-wrapper-3">로그인</div>
                <div className="text-wrapper-4">로그인</div>
              </div>
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
