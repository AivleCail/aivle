import React, {useState} from "react";
import axios from 'axios';
import './external.css'

const ExternalReceipt = () => {

const [selectedFile, setSelectedFile] = useState(null);

const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
};

const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = async () => {
            const base64Data = reader.result.split(',')[1];
            const externalData = {
            file: base64Data,
            };
            axios.post("http://localhost:8000/external/api", externalData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,  
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        };
        reader.readAsDataURL(selectedFile);
        }
    };


    const playAudio = () => {
        if (selectedFile) {
            const audio = new Audio();
            audio.src = URL.createObjectURL(selectedFile);
            audio.play();
        }
    };

    return (
        <div className='mobile-container'>
            <div className='title'>
                <span className='title-text'>새로운 공사 신고 접수</span>
            </div>
            <hr />
            <div className='inform-content'>
                <div className='cail-inform'>
                    <span>안녕하세요 Cail 입니다. 원활한 공사 신고를 위해 다음 안내사항에 따라 공사 정보를 등록해주세요.</span>
                    </div>
                <div className='external-inform'>
                    <span>회사이름 : 한국가스공사 공사내용 : 점검 및 고장 부품 수리 공사주소 : 부산광역시 사하구 @@번지 11호 공사날짜 :  2023년 06월 17일 오후 1시</span>
                </div>
            </div>
            <hr />
            <div className='form-content'>
                <form onSubmit={handleSubmit}>
                <input type='file' name='file' accept='mp3' onChange={handleFileChange} />
                    <button type='button' onClick={playAudio}>재생</button>
                    <button type="submit">전송하기</button>
                </form>
            </div>
        </div>
        )
    };
export default ExternalReceipt;
