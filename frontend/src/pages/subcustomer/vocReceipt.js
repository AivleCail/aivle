import React, { useState, useCallback } from "react";
import axios from 'axios';
import './external.css';
import AiIcon from '../components/icons/ai.svg';
import UserIcon from '../components/icons/user.svg';
import InformContent from '../components/receipt/InformContent';
import FormContent from '../components/receipt/FormContent';

const VocReceipt = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [vocId, setVocId] = useState('');
  const vocIdForm = true;

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
      formData.append('voc_id', vocId);
      formData.append('token', localStorage.getItem('accessToken'));

      axios.post("http://localhost:8000/stt/voc_api", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const informText = "안녕하세요 Cail 입니다. 고객님의 문의 건에 대해 장애 처리가 완료되었습니다. 다음 안내에 알맞게 고객님의 제품이 정상 작동하는지 Cail에게 알려주세요.";
  const speechBubbleText = [
    "1. 고객님의 VoC Number를 입력해주세요.",
    "2. 고객님의 제품이 잘 작동하는지를 알려주세요.",
    "ex: TV가 잘 작동합니다.",
    "ex: 여전히 작동하지 않습니다.",
    "",
    "3. 운용자에게 추가로 전달하고 싶은 메세지는 '추가사항'이라고 말한 뒤 말씀해주세요.",
    "ex: 추가사항, 전원 버튼 자체가 동작하지 않아요."
  ];

  return (
    <div className='mobile-container'>
      <div className='title'>
        <span className='title-text'>장애 조치 확인</span>
      </div>
      <hr />
      <InformContent
        aiIcon={AiIcon}
        informText={informText}
        speechBubbleText={speechBubbleText}
        SubcustomerIcon={UserIcon}
      />
      <hr />
      <FormContent
        vocIdForm={vocIdForm}
        selectedFile={selectedFile}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        vocId={vocId}
        setVocId={setVocId}
      />
    </div>
  );
};

export default VocReceipt;
