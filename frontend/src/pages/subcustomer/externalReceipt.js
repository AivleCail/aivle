import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";  
import './external.css';
import AiIcon from '../components/icons/ai.svg';
import WorkerIcon from '../components/icons/worker.svg';
import InformContent from '../components/receipt/InformContent';
import FormContent from '../components/receipt/FormContent';

const ExternalReceipt = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const vocIdForm = false;
  const navigate = useNavigate();  

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      window.alert("음성 파일을 선택해주세요.");
      return;
    }

    const confirmResult = window.confirm("파일을 전송하시겠습니까?");

    if (confirmResult) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('token',localStorage.getItem('accessToken'));

      axios.post("http://localhost:8000/stt/external_api", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/myexternal"); 
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
  };


  const informText = "안녕하세요 Cail 입니다. 원활한 공사 신고를 위해 다음 안내사항에 따라 공사 정보를 등록해주세요.";
  const speechBubbleText = [
    "회사이름 : 한국가스공사",
    "공사내용 : 점검 및 고장 부품 수리",
    "공사주소 : 부산광역시 사하구 @@번지 11호",
    "공사날짜 : 2023년 06월 17일 오후 1시",
  ];


  const handleLogout = () => { // 로그아웃
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    if (confirmLogout) {
      localStorage.removeItem('accessToken');
      alert('로그아웃 되었습니다.');
      navigate('/');
    }
  };
  
  return (
    <div className='mobile-container'>
      <div className='title'>
        <span className='title-text'>새로운 공사 신고 접수</span>
      </div>
      <div>
      <button className="receipt-logout-button" onClick={handleLogout}>
        <img className="receipt-logout-button-detail" src={process.env.PUBLIC_URL + '/logout.svg'} alt="Logout"/>
      </button>
      </div>
      <hr />
      <InformContent
        aiIcon={AiIcon}
        informText={informText}
        speechBubbleText={speechBubbleText}
        SubcustomerIcon={WorkerIcon}
      />
      <hr />
      <FormContent
        vocIdForm={vocIdForm}
        selectedFile={selectedFile}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ExternalReceipt;
