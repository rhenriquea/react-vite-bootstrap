import * as faceapi from 'face-api.js';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const YesNoGame: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [question, setQuestion] = useState<string>('Do you like coding?');
  const [answer, setAnswer] = useState<string>('');

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

  const videoConstraints = useMemo(
    () => ({
      width: 640,
      height: 480,
      facingMode: 'user',
    }),
    [],
  );

  const detect = useCallback(async () => {
    if (webcamRef.current && webcamRef.current.video && webcamRef.current.video.readyState === 4 && modelsLoaded) {
      const video = webcamRef.current.video;

      // Detect face and landmarks
      const detections = await faceapi.detectSingleFace(video).withFaceLandmarks();

      if (detections && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

          // Get the landmarks
          const landmarks = detections.landmarks;

          // Calculate the tilt of the head based on eye landmarks
          const leftEye = landmarks.getLeftEye();
          const rightEye = landmarks.getRightEye();

          // Calculate the center points of both eyes
          const leftEyeCenter = {
            x: (leftEye[0].x + leftEye[3].x) / 2,
            y: (leftEye[1].y + leftEye[4].y) / 2,
          };

          const rightEyeCenter = {
            x: (rightEye[0].x + rightEye[3].x) / 2,
            y: (rightEye[1].y + rightEye[4].y) / 2,
          };

          // Determine the angle of tilt
          const dx = rightEyeCenter.x - leftEyeCenter.x;
          const dy = rightEyeCenter.y - leftEyeCenter.y;
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);

          // Display question above the user's head
          const { x, y, width, height } = detections.detection.box;
          ctx.font = '20px Arial';
          ctx.fillStyle = 'white';
          ctx.fillText(question, x + width / 2 - ctx.measureText(question).width / 2, y - 10);

          // Determine answer based on the tilt angle
          if (angle > 15) {
            setAnswer('Yes');
            ctx.font = '40px Arial';
            ctx.fillStyle = 'green';
            ctx.fillText('Yes', x + width + 10, y + height / 2);
          } else if (angle < -15) {
            setAnswer('No');
            ctx.font = '40px Arial';
            ctx.fillStyle = 'red';
            ctx.fillText('No', x - 60, y + height / 2);
          } else {
            setAnswer('');
          }
        }
      }
    }
  }, [modelsLoaded, question, answer]);

  useEffect(() => {
    const interval = setInterval(() => {
      detect();
    }, 100);

    return () => clearInterval(interval);
  }, [detect]);

  return (
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
  );
};

export default YesNoGame;
