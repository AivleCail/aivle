import React, { useState, useRef, useCallback } from "react";
import AudioRecord from "./AudioContent";
const FormContent = ({ selectedFile, setSelectedFile, handleFileChange, handleSubmit }) => {
  const audioRef = useRef(null);

  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [disabled, setDisabled] = useState(true);

  const onRecAudio = () => {

    setDisabled(true)
    
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  const offRecAudio = () => {
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    media.stop();

    analyser.disconnect();
    source.disconnect();
    
    if (audioUrl) {
      URL.createObjectURL(audioUrl);
      // convertToM4A();
    }
    
    const sound = new File([audioUrl], "soundBlob", {
      lastModified: new Date().getTime(),
      type: "audio",
    });
    
    setDisabled(false);
    setSelectedFile(sound);
  };

  const play = () => { 
    const audio = new Audio(URL.createObjectURL(audioUrl));
    audio.loop = false;
    audio.volume = 1;
    audio.play();
  };

//    const convertToM4A = () => {
//    //  const process = new ffmpeg(audioUrl);
//     process.then((audio) => {
//       audio
//          .setAudioCodec('aac')
//          .save(`${audioUrl.name.split('.')[0]}.m4a`, (stdout, stderr) => {
//            const convertedFile = new File([stdout], `${audioUrl.name.split('.')[0]}.m4a`, {
//              type: 'audio/mp4',
//           });
//            setSelectedFile(convertedFile);
//          });
//      }, (err) => {
//        console.log('Error converting file: ', err);
//      });
//  };
  

  const handlePlayAudio = () => {
    if (selectedFile) {
      audioRef.current.src = URL.createObjectURL(selectedFile);
      audioRef.current.play();
    }
  };

  
  const downloadAudioFile = useCallback(() => {
    if (audioUrl) {
      const audioElement = document.createElement('audio');
      const sourceElement = document.createElement('source');
      sourceElement.src = URL.createObjectURL(audioUrl);
      audioElement.appendChild(sourceElement);
      audioElement.style.display = 'none';
      document.body.appendChild(audioElement);
      
      const a = document.createElement('a');
      sourceElement.type = 'audio/mp3';
      a.href = sourceElement.src;
      a.download = 'audio.mp3';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(sourceElement.src);
    }
  }, [audioUrl]);
  
  return (
    <div className='form-content'>

       <div>
          <button className="record-start" onClick={onRecAudio}>녹음 시작</button>
          <button className="record-stop" onClick={offRecAudio}>녹음 정지</button>
        </div> 
         <div className='audio-start'>
            <button className='upload-start-button' onClick={play} disabled={disabled}>재생</button>
        </div> 
         <button onClick={downloadAudioFile}>다운로드</button> 
         <AudioRecord /> 
        <form onSubmit={handleSubmit}>
        <div className='upload-start'>
          <input type='file' name='file' className='file-upload-input' accept='.mp3, .m4a' onChange={handleFileChange} />
          <div className='audio-start'>
            <button type='submit' onClick={handlePlayAudio} className='upload-start-button'>재생</button>
            <audio className='audio-controller' ref={audioRef} controls></audio>
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