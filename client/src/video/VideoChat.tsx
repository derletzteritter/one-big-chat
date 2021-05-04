import React, { useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

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
    const video = document.querySelector('video');
    const input: any = document.getElementById('myImg');
    video.srcObject = stream;
    video.blur();
    video.controls = true;
    await faceapi.detectSingleFace(input);
    await faceapi.detectSingleFace(input).withFaceExpressions();
    await faceapi.detectSingleFace(input).withFaceLandmarks();
    await faceapi
      .detectSingleFace(input)
      .withFaceLandmarks()
      .withFaceExpressions();
    await faceapi
      .detectSingleFace(input)
      .withFaceLandmarks()
      .withFaceExpressions()
      .withFaceDescriptor();
    await faceapi
      .detectSingleFace(input)
      .withFaceLandmarks()
      .withAgeAndGender()
      .withFaceDescriptor();
    await faceapi
      .detectSingleFace(input)
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender()
      .withFaceDescriptor();

    const displaySize = { width: input.width, height: input.height };
    // resize the overlay canvas to the input dimensions
    const canvas: any = document.getElementById('myCanvas');
    faceapi.matchDimensions(canvas, displaySize);
  };

  return (
    <div>
      <video id="myImg" ref={videoRef} autoPlay playsInline muted></video>
      <canvas id="myCanvas" />
      <button onClick={handleWebcam}>Start Stream</button>
      <h3>Grayscale</h3>
      <input
        type="range"
        value={grayscale}
        onChange={(e) => {
          setGrayscale(e.currentTarget.value);
          video.style.filter = `grayscale(${grayscale}%)`;
        }}
      />
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
