import React from 'react';

export default function VideoChat() {
  const handleWebcam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(handleStartStream);
  };

  const handleStartStream = async (stream: MediaStream) => {
    const video = document.querySelector('video');
    video.srcObject = stream;
    video.controls = true;
  };

  return (
    <div>
      <video autoPlay playsInline muted></video>
      <button onClick={handleWebcam}>Start Stream</button>
    </div>
  );
}
