import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [Role, setRole] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  
  const handleSignup = () => {
    if (password !== confirmPassword) {
      // 비밀번호가 일치하지 않을 경우 처리
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!validateEmail(email)) {
      // 이메일 유효성 검사
      alert('유효한 이메일을 입력해주세요.');
      return;
    }

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
        navigate('/');
      })
      .catch((error) => {
        // Handle error.
        alert('이메일이 중복되었습니다.', error.response);
      });
  };
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div className="signup">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-group">
            <div className="signup-text-1">이메일</div>
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
            <div className="signup-text-2">비밀번호</div>
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
            <div className="signup-text-3">비밀번호 확인</div>
            <div className="overlap-group-wrapper-2">
              <div className="div">
              <input 
              type="password"
              className="text-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
          />


      
              </div>
            </div>
            <div className="signup-text-4">이름</div>
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
              다 음
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
