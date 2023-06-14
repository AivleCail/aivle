import "./Signup.css"

function Signup() {
  return (
    <div className="signup">
    <div className="overlap-wrapper">
      <div className="overlap">
        <div className="overlap-group">
          <div className="text-1">이메일</div>
          <div className="group">
            <div className="div-wrapper">
              <input type = "text" className = "text-input" />
            </div>
          </div>
          <div className="text-2">비밀번호</div>
          <div className="overlap-group-wrapper-1">
            <div className="div">
              <input type = "password" className = "text-input" />
            </div>
          </div>
          <div className="text-3">비밀번호 확인</div>
          <div className="overlap-group-wrapper-2">
            <div className="div">
              <input type = "password" className = "text-input" />
            </div>
          </div>
          <div className="text-4">사원번호</div>
          <div className="overlap-group-wrapper-3">
            <div className="div-1">
              <input type = "text" className = "text-input-1" />
            </div>
          </div>
          <div className="group-2">
            <button className="signup-button">
              다음
            </button>
          </div>
          <img className="img" alt="Element" src={process.env.PUBLIC_URL + "login_background.png"} />
        </div>
        <div className="signup_title">회원가입</div>
      </div>
    </div>
  </div>
  );
}

export default Signup;
