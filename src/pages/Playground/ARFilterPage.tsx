import * as faceapi from 'face-api.js';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Webcam from 'react-webcam';

import glasses from './images/glasses.png';
import hat from './images/hat.png';
import mustache from './images/mustache.png';

const ARFilterPage: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(new Image());
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('mustache');

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
      ]);
      setModelsLoaded(true);
    };

    loadModels();
  }, []);

  useEffect(() => {
    const img = imageRef.current;
    switch (selectedFilter) {
      case 'mustache':
        img.src = mustache;
        img.width = 100;
        img.height = 50;
        break;
      case 'hat':
        img.src = hat;
        img.width = 450;
        img.height = 280;
        break;
      case 'glasses':
        img.src = glasses;
        img.width = 180;
        img.height = 150;
        break;
      default:
        break;
    }
  }, [selectedFilter]);

  const videoConstraints = useMemo(
    () => ({
      width: 640,
      height: 480,
      facingMode: 'user',
    }),
    [],
  );

  const detect = useCallback(async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4 &&
      modelsLoaded &&
      imageRef.current
    ) {
      const video = webcamRef.current.video;

      // Detect face and landmarks
      const detections = await faceapi.detectSingleFace(video).withFaceLandmarks();

      if (detections && canvasRef.current) {
        const dims = faceapi.matchDimensions(canvasRef.current, video, true);
        const resizedDetections = faceapi.resizeResults(detections, dims);

        // const mouth = resizedDetections.landmarks.getMouth();
        // const jawOutline = resizedDetections.landmarks.getJawOutline();
        // const leftEye = resizedDetections.landmarks.getLeftEye();
        // const leftEyeBrow = resizedDetections.landmarks.getLeftEyeBrow();
        // const nose = resizedDetections.landmarks.getNose();
        // const rightEye = resizedDetections.landmarks.getRightEye();
        // const rightEyeBrow = resizedDetections.landmarks.getRightEyeBrow();

        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

          const overlayImage = imageRef.current;

          if (selectedFilter === 'mustache') {
            const mouth = resizedDetections.landmarks.getMouth();
            const centerX = (mouth[3].x + mouth[9].x) / 2;
            const centerY = (mouth[3].y + mouth[9].y) / 2 - 20;
            const dx = mouth[6].x - mouth[0].x;
            const dy = mouth[6].y - mouth[0].y;
            const angle = Math.atan2(dy, dx);
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle);
            ctx.drawImage(
              overlayImage,
              -overlayImage.width / 2,
              -overlayImage.height / 2,
              overlayImage.width,
              overlayImage.height,
            );
            ctx.restore();
          } else if (selectedFilter === 'hat') {
            const nose = resizedDetections.landmarks.getNose();
            const centerX = nose[0].x;
            const centerY = nose[0].y - 10; // Position hat above the head
            ctx.drawImage(
              overlayImage,
              centerX - overlayImage.width / 2,
              centerY - overlayImage.height,
              overlayImage.width,
              overlayImage.height,
            );
          } else if (selectedFilter === 'glasses') {
            const leftEye = resizedDetections.landmarks.getLeftEye();
            const rightEye = resizedDetections.landmarks.getRightEye();
            const centerX = (leftEye[0].x + rightEye[3].x) / 2;
            const centerY = (leftEye[1].y + rightEye[4].y) / 2;
            ctx.drawImage(
              overlayImage,
              centerX - overlayImage.width / 2,
              centerY - overlayImage.height / 2,
              overlayImage.width,
              overlayImage.height,
            );
          }
        }
      }
    }
  }, [modelsLoaded, selectedFilter]);

  useEffect(() => {
    const interval = setInterval(() => {
      detect();
    }, 100);

    return () => clearInterval(interval);
  }, [detect]);

  return (
    <div>
      <select
        style={{ position: 'absolute', left: '10px', zIndex: 10 }}
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value)}
      >
        <option value="mustache">Mustache</option>
        <option value="hat">Hat</option>
        <option value="glasses">Glasses</option>
      </select>
      <div style={{ textAlign: 'center', marginTop: '50px', position: 'relative' }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 8,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />
      </div>
    </div>
  );
};

export default ARFilterPage;
