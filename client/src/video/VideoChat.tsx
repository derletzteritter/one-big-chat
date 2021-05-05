import React, { useRef, useState } from 'react';

export default function VideoChat() {
  const videoRef = useRef(null);
  const [grayscale, setGrayscale] = useState<any>(0);
  const [invert, setInvert] = useState<any>(0);
  const video = document.querySelector('video');

  const handleWebcam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(handleStartStream);
  };

  const handleStartStream = async (stream: MediaStream) => {
    /*const video = document.querySelector('video');*/
    video.srcObject = stream;
    video.controls = true;
  };

  return (
    <div>
      <video autoPlay playsInline muted></video>
      <button onClick={handleWebcam}>Start Stream</button>
      <h3>Grayscale</h3>
      <h3>Invert</h3>
      <input
        type="range"
        value={invert}
        onChange={(e) => {
          setInvert(e.currentTarget.value);
          video.style.filter = `invert(${invert}%)`;
        }}
      />
    </div>
  );
}
