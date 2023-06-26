import React, { useRef } from "react";
import AudioRecord from "./AudioContent";

const FormContent = ({ selectedFile, handleFileChange, handleSubmit }) => {
  const audioRef = useRef(null);

  const handlePlayAudio = () => {
    if (selectedFile) {
      audioRef.current.src = URL.createObjectURL(selectedFile);
      audioRef.current.play();
    }
  };

  return (
    <div className='form-content'>
      <form onSubmit={handleSubmit}>
        {/* <AudioRecord /> */}
        <div className='upload-start'>
          <input type='file' name='file' accept='.mp3, .m4a' onChange={handleFileChange} />
          <div className='audio-start'>
            <button type='button' onClick={handlePlayAudio} className='upload-start-button'>재생</button>
            <audio ref={audioRef} controls></audio>
          </div>
        </div>
        <div>
          <button type="submit" className='receipt-button voice-send-button'>접수 내용 확인</button>
        </div>
      </form>
    </div>
  );
};

export default FormContent;
