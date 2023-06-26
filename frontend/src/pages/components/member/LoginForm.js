import React from 'react';
import './Member.css';

const LoginForm = ({ activeIndex, handleManagerClick, handleExternalWorkerClick, email, password, setEmail, setPassword, handleLogin, emailErr, passwordErr, err }) => {
  return (
    <div className="login-form">
      <ul className='login-ul'>
        <li onClick={handleManagerClick} className={`radio-li ${activeIndex === 0 ? 'login-active' : ''}`}>
          <p className='login-li-text'>매니저</p>
          </li>
        <li onClick={handleExternalWorkerClick} className={`radio-li ${activeIndex === 1 ? 'login-active' : ''}`}>
          <p className='login-li-text'>사외공사자</p>
        </li>
      </ul>
      <div className='login-input-form'>
        <div className='input-border'>
          <img className="icon-input" alt="Element" src={process.env.PUBLIC_URL + '/login_id.png'} />
          <input type="text" className="text-input" placeholder="이메일 입력" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='input-border'>
          <img className="icon-input" alt="Element" src={process.env.PUBLIC_URL + '/login_pw.png'} />
          <input type="password" className="text-input" placeholder="비밀번호 입력" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <div className='error-group'>
        {emailErr && <span className="log-error-message e-email">이메일을 입력해주세요.</span>}
        {passwordErr && <span className="log-error-message e-pw">비밀번호를 입력해주세요.</span>}
        {err && ( <div className="log-error-message e-co" dangerouslySetInnerHTML={{ __html: err }} /> )}
      </div>
      <button type="submit" className="submit" onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default LoginForm;
