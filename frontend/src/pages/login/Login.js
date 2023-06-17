import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
        navigate('/intro');
        }
    }, []);

    const handleLogin = () => {
        if (email.trim() === '') {
            alert('이메일을 입력해주세요.');
            return;
        }
    
        if (password.trim() === '') {
            alert('비밀번호를 입력해주세요.');
            return;
        }
    
        // Clear error messages if fields are not empty
        setEmailError('');
        setPasswordError('');
    
        axios
        .post('http://localhost:8080/auth/login', {
            email: email,
            password: password,
        })
        .then((response) => {
            const accessToken = response.data.accessToken;
            console.log('Access token:', accessToken);
            localStorage.setItem('accessToken', accessToken);
            navigate('/intro');
        })
        .catch((error) => {
            console.error('Login error:', error);
            alert('이메일 또는 비밀번호가 일치하지 않습니다.');
        });
    };

    const [activeIndex, setActiveIndex]=useState(0);

    const tabClickHandler=(index)=>{
        setActiveIndex(index);
    };

    const tabContArr=[
        {
            tabTitle:(
                <li className={activeIndex===0 ? "is-active" : ""} onClick={()=>tabClickHandler(0)}> 매니저 </li>
            ),
            tabCont:(
                <div>
                    <div className="group">
                        <div className="div-wrapper">
                        <input
    type="text"
    className="text-input"
    placeholder="이메일 입력"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
/>
{emailError && <p className="error-message">{emailError}</p>}
                        </div>
                    </div>
                    <div className="overlap-group-wrapper">
                        <div className="div">
                        <input
    type="password"
    className="text-input"
    placeholder="비밀번호 입력"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
/>
{passwordError && <p className="error-message">{passwordError}</p>}
                        </div>
                    </div>
                    <img
                        className="icon-user"
                        alt="Element"
                        src={process.env.PUBLIC_URL + '/login_id.png'}
                    />
                    <img
                        className="element"
                        alt="Element"
                        src={process.env.PUBLIC_URL + '/login_pw.png'}
                    />
                    <img
                        className="img"
                        alt="Element"
                        src={process.env.PUBLIC_URL + '/login_background.png'}
                    />
                </div>
            )
        },
        {
            tabTitle:(
                <li className={activeIndex===1 ? "is-active" : ""} onClick={()=>tabClickHandler(1)}> 사외공사자 </li>
            ),
            tabCont:(
                <div>
                    <div className="group">
                        <div className="div-wrapper">
                            <input
                                type="text"
                                className="text-input"
                                placeholder="이메일 입력"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="overlap-group-wrapper">
                        <div className="div">
                            <input
                                type="password"
                                className="text-input"
                                placeholder="비밀번호 입력"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <img
                        className="icon-user"
                        alt="Element"
                        src={process.env.PUBLIC_URL + '/login_id.png'}
                    />
                    <img
                        className="element"
                        alt="Element"
                        src={process.env.PUBLIC_URL + '/login_pw.png'}
                    />
                    <img
                        className="img"
                        alt="Element"
                        src={process.env.PUBLIC_URL + '/login_background.png'}
                    />
                </div>
            )
        }
    ];

    return (
        <div className="login">
          <div className="tab-wrapper">
            <div className="tabs">
              <ul>
                {tabContArr.map((section, index)=>{
                    return section.tabTitle
                })}
              </ul>
              <div>
                {tabContArr[activeIndex].tabCont}
              </div>
            </div>
          </div>

          <div className="text-wrapper-6">
            <Link to={'/signup'}>회원가입</Link>
          </div>
          <Link to="/">
            <img
              className="element-2"
              alt="Element"
              src={process.env.PUBLIC_URL + '/login_logo.png'}
            />
          </Link>
            <div className="group-2">
                <button className="login-button" onClick={handleLogin}>
                    로그인
                </button>
            </div>
          <div className='introcomment'>고객 및 사외공사 신고 자동 대응 관리 서비스</div>

        </div>
    );
}

export default Login;