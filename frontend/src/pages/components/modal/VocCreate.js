import React, { useState } from 'react';  
import axios from 'axios';
import './VocCreate.css';
import { API_URL } from '../../config';
import '../../login/Signup.css';

const VocCreate = ({closeModal}) => {

    const [customerName, setCustomerName] = useState("");
    const [address, setAddress] = useState("");
    const [type, setType] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [opinion, setOpinion] = useState("");
    const [phonenumberError, setPhonenumberError] = useState(false);
    const [customerNameError, setCustomerNameError] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    
    const validateName = (customerName) => {
      const inputValue = customerName;
      if (inputValue.length > 4 || inputValue.length < 2) {
        return false;
      }
      const customerNameRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣]+$/;
      return customerNameRegex.test(inputValue);
    };

    const validatePhonenumber = (phoneNumber) => {
      const phonenumberRegex = /^(010)-\d{4}-\d{4}$/;
      return phonenumberRegex.test(phoneNumber);
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        if (!customerName || !address || !type || !phoneNumber || !opinion ) {
          setSubmitted(true);
          return;
        }

        if ((!validatePhonenumber(phoneNumber)) && (!validateName(customerName))){
          setPhonenumberError(true);
          setCustomerNameError(true);
          return;
        }
        
        if ((!validatePhonenumber(phoneNumber))){
          setPhonenumberError(true);
          return;
        }

        if ((!validateName(customerName))){
          setCustomerNameError(true);
          return;
        }

        const check = window.confirm('누락 VOC내역을 추가하시겠습니까?');
        if (!check) {
            return;
        }  
  
        const articleData = {
            customerName,
            address,
            type,
            phoneNumber,
            opinion
        };
  
  
        axios.post(`${API_URL}8080/voc/create`, articleData, {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })

            .then((response) => {
            console.log(response.data);
            alert("VOC 접수가 완료되었습니다."); 
            closeModal();
            })
            .catch((error) => {
            setSubmitted(false);
            console.error("Error:", error);
            });
    
    
        setCustomerName("");
        setAddress("");
        setType("");
        setPhoneNumber("");
        setOpinion("");
        };
  


    return (
      <div className="create-article-container">
        <h2>누락 VOC 작성</h2>
        <form onSubmit={handleSubmit}>
        <div className='a-input-group'>
          <div className='input-labels'>
            <span className='a-input-group-label'>이름</span>
            {submitted && !customerName && <span className="field-error-message">필드를 입력해주세요.</span>}
            {customerNameError && <span className="field-error-message">유효한 이름을 입력해 주세요.</span>}
          </div>
          <input className='signup-input' type="text" value={customerName} placeholder="홍길동" onChange={(e) => {
            setCustomerName(e.target.value);
            setCustomerNameError(false);
            setSubmitted(false);
          }}/>
          </div>
        <div className='a-input-group'>
          <div className='input-labels'>
            <span className='a-input-group-label'>주소</span>
            {submitted && !address && <span className="field-error-message">필드를 입력해주세요.</span>}
          </div>
          <input className='signup-input' type="text" value={address} placeholder="부산시 동구 중앙대로" onChange={(e) => {
            setAddress(e.target.value);
            setSubmitted(false);
          }}/>
        </div>
        <div className='a-input-group'>
          <div className='input-labels'>
            <span className='a-input-group-label'>전화번호</span>
            {submitted && !phoneNumber && <span className="field-error-message">필드를 입력해주세요.</span>}
            {phonenumberError && <span className="field-error-message">유효한 전화번호를 입력해주세요.</span>}
          </div>
          <input className='signup-input' type="text" value={phoneNumber} placeholder="010-0000-0000" onChange={(e) => {
            setPhoneNumber(e.target.value);
            setPhonenumberError(false);
            setSubmitted(false);
          }} />
        </div>
          <div className='input-labels'>
            <span className='a-input-group-label'>카테고리</span>
            {submitted && !type && <span className="field-error-message">필드를 입력해주세요.</span>}
            <select style={{ marginTop: '0.8rem' }}
              type="text"
              placeholder="장애유형을 선택해 주세요"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setSubmitted(false);
              }}
              >
                <option value="">선택</option>
                <option value="인터넷">인터넷</option>
                <option value="전화">전화</option>
                <option value="TV">TV</option>
              </select>
          </div>    
          <div className='input-labels'>
            <span className='a-input-group-label' >사용자 의견</span>
            {submitted && !opinion && <span className="field-error-message">필드를 입력해주세요.</span>}
            <textarea style={{ marginTop: '0.8rem' }}
              placeholder="신고자의견을 작성해 주세요"
              value={opinion}
              onChange={(e) => {
                setOpinion(e.target.value);
                setSubmitted(false);
              }}
            ></textarea>
          </div>
          <button class = "create-button" type="submit" >VOC 접수</button>
        </form>
        </div>
  );
};

export default VocCreate;