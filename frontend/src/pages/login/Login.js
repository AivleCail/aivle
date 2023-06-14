import "./Login.css"
import {Link} from "react-router-dom"

function Login() {
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
          <img className="icon-user" alt="Element" src={process.env.PUBLIC_URL + "/login_id.png"} />
          <img className="element" alt="Element" src={process.env.PUBLIC_URL + "/login_pw.png"} />
          <img className="img" alt="Element" src={process.env.PUBLIC_URL + "login_background.png"} />
        </div>
        <div className="text-wrapper-6"><Link to={"/signup"}>회원가입</Link></div>
        <img className="element-2" alt="Element"  src={process.env.PUBLIC_URL + "/login_logo.png"} />
      </div>
    </div>
  </div>
  );
}

export default Login;
