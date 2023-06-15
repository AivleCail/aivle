import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    axios
      .post('http://localhost:8080/auth/signup', {
        name: name,
        email: email,
        password: password,
      }, { withCredentials: true })
      .then((response) => {
        // Handle success.
        console.log('Well done!');
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
      })
      .catch((error) => {
        // Handle error.
        console.log('An error occurred:', error.response);
      });
  };

  return (
    <div className="signup">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-group">
            <div className="text-1">이메일</div>
            <div className="group">
              <div className="div-wrapper">
                <input
                  type="text"
                  className="text-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="text-2">비밀번호</div>
            <div className="overlap-group-wrapper-1">
              <div className="div">
                <input
                  type="password"
                  className="text-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="text-3">비밀번호 확인</div>
            <div className="overlap-group-wrapper-2">
              <div className="div">
                <input type="password" className="text-input" />
              </div>
            </div>
            <div className="text-4">이름</div>
            <div className="overlap-group-wrapper-3">
              <div className="div-1">
                <input
                  type="text"
                  className="text-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="group-2">
              <button className="signup-button" onClick={handleSignup}>
                다음
              </button>
            </div>
            <img
              className="img"
              alt="Element"
              src={process.env.PUBLIC_URL + 'login_background.png'}
            />
          </div>
          <div className="signup_title">회원가입</div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
