import React, {useState} from "react";
import axios from 'axios';
import './external.css'
import AiIcon from '../components/icons/ai.svg'
import WorkerIcon from '../components/icons/worker.svg'

const ExternalReceipt = () => {

const [selectedFile, setSelectedFile] = useState(null);

const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
};

const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
            
        axios.post("http://localhost:8000/external/api", formData, {
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
    };
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
                <div className='inform-content-item'>
                    <img src={AiIcon} alt="AI Icon" className='cail-inform-img'/>
                    <div className='speech-bubble'>
                        <span>안녕하세요 Cail 입니다. 원활한 공사 신고를 위해 다음 안내사항에 따라 공사 정보를 등록해주세요.</span>
                    </div>
                </div>
                <div className='inform-content-item'>
                    <div className='speech-bubble'>
                        <p>회사이름 : 한국가스공사</p>
                        <p>공사내용 : 점검 및 고장 부품 수리</p>
                        <p>공사주소 : 부산광역시 사하구 @@번지 11호</p>
                        <p>공사날짜 :  2023년 06월 17일 오후 1시</p>
                    </div>
                    <img src={WorkerIcon} alt="AI Icon" className='cail-inform-img'/>
                </div>
            </div>
            <hr />
            <div className='form-content'>
                <form onSubmit={handleSubmit}>
                    <div className='upload-start'>
                        <input type='file' name='file' accept='.mp3, .m4a' onChange={handleFileChange}/>
                        <button type='button' onClick={playAudio} className='audio-buttons'>재생</button>
                    </div>
                    <div>
                        <button type="submit" className='audio-buttons'>전송하기</button>
                    </div>
                </form>
            </div>
        </div>
        )
    };
export default ExternalReceipt;
