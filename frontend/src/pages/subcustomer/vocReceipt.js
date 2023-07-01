import React, { useState } from "react";
import axios from 'axios';
import './external.css';
import AiIcon from '../components/icons/ai.svg';
import UserIcon from '../components/icons/user.svg';
import InformContent from '../components/receipt/InformContent';
import FormContent from '../components/receipt/FormContent';
import { useLocation } from "react-router-dom";
import { API_URL } from "../config";

const VocReceipt = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [vocId, setVocId] = useState('');
  const [vocBefore, setVocBefore] = useState('');
  const [vocAfter, setVocAfter] = useState('');
  const [vocEntire, setVocEntire] = useState("");
  const [vocStatus, setVocStatus] = useState("");
  const [vocStatusDetail,setVocStatusDetail] = useState("");
  const [percentage,setPercentage] = useState("");
  const [isDataReceived, setIsDataReceived] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      window.alert("음성 파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('voc_id', vocId);
      formData.append('token', localStorage.getItem('accessToken'));

      axios.post(`${API_URL}8000/stt/voc_check`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setVocBefore(response.data.voc_before);
        setVocAfter(response.data.voc_after);
        setVocEntire(response.data.voc_entire);
        setVocStatus(response.data.voc_status);
        setVocStatusDetail(response.data.voc_status_detail);
        setPercentage(response.data.percentage);
        setIsDataReceived(true);

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const tospring = (e) => {
    e.preventDefault();

    if (!selectedFile) {
      window.alert("음성 파일을 선택해주세요.");
      return;
    }
    const vocData = {
      "voc_id": id,
      "voc_entire": vocEntire,
      "voc_status": vocStatus,
      "voc_status_detail": vocStatusDetail,
      "percentage": percentage,
    }

    const confirm = window.confirm("해당 접수 내용을 전송하시겠습니까?");

    if (confirm) {
      axios.post(`${API_URL}8080/vocResult`, vocData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => {
        setTimeout(function(){
          window.alert("접수가 완료되었습니다!");
        }, 1000);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
  };

  const informText = "안녕하세요 Cail 입니다. 고객님의 문의 건에 대해 장애 처리가 완료되었습니다. 다음 안내에 따라 고객님의 제품이 정상 작동하는지 Cail에게 알려주세요.";
  const speechBubbleText = [
    "1. 고객님의 제품이 잘 작동하는지를 알려주세요.",
    "ex) TV가 잘 작동합니다.",
    "ex) 여전히 작동하지 않습니다.",

    "",
    "2. 운용자에게 추가로 전달하고 싶은 메세지는 '추가의견'이라고 말한 뒤 말씀해주세요.",
    "ex) 추가의견, 전원 버튼 자체가 동작하지 않아요."
  ];

  return (
    <div className='mobile-container'>
      <div className='mobile-title mobile-title-voc'>
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
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
      />

      <div className='received-box'>
        {isDataReceived && (
          <div className='received-box-text'>
            <p className='received-box-text-one'>접수 내용: {vocBefore}</p>
            <p className='received-box-text-one'>추가 의견: {vocAfter}</p>
          </div>
        )}
      </div>

      <button type="submit" className='receipt-button voice-send-button' onClick={tospring}>전송</button>
    </div>
  );
};

export default VocReceipt;
