import React, { useRef } from "react";
import AudioRecord from "./AudioContent";

const FormContent = ({ vocIdForm, selectedFile, handleFileChange, handleSubmit, vocId, setVocId }) => {
  const audioRef = useRef(null);

  const handlePlayAudio = () => {
    if (selectedFile) {
      audioRef.current.src = URL.createObjectURL(selectedFile);
      audioRef.current.play();
    }
  };

  const handleVocIdChange = (event) => {
    setVocId(event.target.value);
  };

  return (
    <div className='form-content'>
      <form onSubmit={handleSubmit}>
        { vocIdForm ? <div className='vocId-input'><label htmlFor='voc_id'>VoC Number를 입력해주세요: </label><input type='number' name='voc_id' value={vocId} onChange={handleVocIdChange}></input></div> : null}
        <AudioRecord />
        <div className='upload-start'>
          <input type='file' name='file' accept='.mp3, .m4a' onChange={handleFileChange} />
          <div className='audio-start'>
            <button type='button' onClick={handlePlayAudio} className='upload-start-button'>재생</button>
            <audio ref={audioRef} controls></audio>
          </div>
        </div>
        <div>
          <button type="submit" className='receipt-button voice-send-button'>전송하기</button>
        </div>
      </form>
    </div>
  );
};

export default FormContent;
