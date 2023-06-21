import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('manager');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [errorAlert, setErrorAlert] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSignup = () => {
    if (!email || !password || !confirmPassword || !name || !role) {
      setErrorAlert('');
      setSubmitted(true);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }

    // 사용자 가입 유형을 확인하는 알림창 표시
    showUserTypeAlert()
      .then(() => {
        axios
          .post('http://localhost:8080/auth/signup', {
            name: name,
            email: email,
            password: password,
            auth: role === 'manager' ? 'ROLE_ADMIN' : 'ROLE_USER',
          }, { withCredentials: true })
          .then((response) => {
            console.log('Well done!');
            console.log('User profile', response.data.user);
            console.log('User token', response.data.jwt);
            navigate('/');
          })
          .catch((error) => {
            setErrorAlert('이메일이 중복되었습니다.');
            console.error(error);
          });
      })
      .catch(() => {
        // 사용자가 취소한 경우, 필요한 초기화 작업을 수행할 수 있습니다.
        setRole('manager');
        setErrorAlert('');
        setSubmitted(false);
      });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleUserType = (selectedRole) => {
    setRole(selectedRole);
  };

  const showUserTypeAlert = () => {
    let userType = '';
    if (role === 'manager') {
      userType = '매니저';
    } else if (role === 'external') {
      userType = '사외공사자';
    }
    return new Promise((resolve, reject) => {
      if (window.confirm(`회원가입을 ${userType}로 진행하시겠습니까?`)) {
        resolve();
      } else {
        reject();
      }
    });
  };

  return (
    <div className="container">
      <div className="bg-img" style={{ backgroundImage: 'url(bg.svg)' }}></div>
      <div className="context">
        <div className='title'><span>회원 가입</span></div>
        <div className='radio-buttons'>
          <button className={role === 'manager' ? 'user-type-button selected' : 'user-type-button'}
            onClick={() => handleUserType('manager')}>매니저</button>
          <button className={role === 'external' ? 'user-type-button selected' : 'user-type-button'}
            onClick={() => handleUserType('external')}>사외공사자</button>
        </div>
        <div className='a-input-group'>
          <div className='sub-title'>
            <span className='a-input-group-label'>이메일</span>
            {submitted && !email && <span className="field-error-message">필드를 입력해주세요.</span>}
            {emailError && <span className="field-error-message">유효한 이메일을 입력해주세요.</span>}
          </div>
          <input className='signup-input' type="text" value={email} onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
            setErrorAlert('');
            setSubmitted(false);
          }} />
        </div>
        <div className='a-input-group'>
          <div className='sub-title'>
            <span className='a-input-group-label'>비밀번호</span>
            {submitted && !password && <span className="field-error-message">필드를 입력해주세요.</span>}
          </div>
          <input className='signup-input' type="password" value={password} onChange={(e) => {
            setPassword(e.target.value);
            setErrorAlert('');
            setSubmitted(false);
          }} />
        </div>
        <div className='a-input-group'>
          <div className='sub-title'>
            <span className='a-input-group-label'>비밀번호 확인</span>
            {submitted && !confirmPassword && <span className="field-error-message">필드를 입력해주세요.</span>}
            {confirmPasswordError && <span className="field-error-message">비밀번호가 일치하지 않습니다.</span>}
          </div>
          <input className='signup-input' type="password" value={confirmPassword} onChange={(e) => {
            setConfirmPassword(e.target.value);
            setConfirmPasswordError(false);
            setErrorAlert('');
            setSubmitted(false);
            }}
          />
        </div>
        <div className='a-input-group'>
          <div className='sub-title'>
            <span className='a-input-group-label'>이름</span>
            {submitted && !name && <span className="field-error-message">필드를 입력해주세요.</span>}
          </div>
          <input className='signup-input' type="text" value={name} onChange={(e) => {
            setName(e.target.value);
            setErrorAlert('');
            setSubmitted(false);
          }}/>
        </div>
        <div className='error-group'>
          {errorAlert && <div className="error-alert">{errorAlert}</div>}
        </div>
        <button className="signup-button" onClick={handleSignup}>가 입</button>
      </div>
    </div>
  );
};

export default Signup;
