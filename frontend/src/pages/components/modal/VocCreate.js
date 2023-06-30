import React, { useState } from 'react';  
import axios from 'axios';
import './VocCreate.css';
import { API_URL } from '../../config';

const VocCreate = ({closeModal}) => {

    const [customerName, setCustomerName] = useState("");
    const [address, setAddress] = useState("");
    const [type, setType] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [opinion, setOpinion] = useState("");

    const handleCustomerName = (e) => {
      setCustomerName(e.target.value);
    };
  
    const handleAddress = (e) => {
      setAddress(e.target.value);
    };
  
    const handleType = (e) => {
      setType(e.target.value);
    };

    const handlePhone = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleOpinion = (e) => {
        setOpinion(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (customerName.trim() === "") {
            alert("고객명을 입력해주세요.");
            return;
        }

        if (address.trim() === "") {
            alert("발생지역을 입력해주세요.");
            return;
        }

        if (type.trim() === "") {
            alert("장애유형을 선택해주세요.");
            return;
        }

        if (phoneNumber.trim() === "") {
            alert("전화번호를 입력해주세요.");
            return;
        }
        if (opinion.trim() === "") {
            alert("신고자의견을 입력해주세요.");
            return;
        }
        const check = window.confirm('게시글을 작성하시겠습니까?');
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
            alert("Voc 접수가 완료되었습니다."); 
            closeModal();
            })
            .catch((error) => {
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
        <h2>누락 voc 작성</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="고객명을 입력해 주세요"
            value={customerName}
            onChange={handleCustomerName}
          />
          <input
            type="text"
            placeholder="발생지역을 입력해 주세요"
            value={address}
            onChange={handleAddress}
          />
          <input
            type="text"
            placeholder="전화번호를 입력해 주세요"
            value={phoneNumber}
            onChange={handlePhone}
          />
          <div><p>카테고리</p>
            <select
              type="text"
              placeholder="장애유형을 선택해 주세요"
              value={type}
              onChange={handleType}
              >
                <option value="">선택</option>
                <option value="인터넷">인터넷</option>
                <option value="전화">전화</option>
                <option value="TV">TV</option>
              </select>
          </div>
          <textarea
            placeholder="신고자의견을 작성해 주세요"
            value={opinion}
            onChange={handleOpinion}
          ></textarea>

          <button class = "create-button" type="submit" >voc 접수</button>
        </form>
        </div>
  );
};

export default VocCreate;