import * as faceapi from 'face-api.js';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const emotionEmojiMap: Record<string, string> = {
  happy: '😊',
  sad: '😢',
  angry: '😠',
  fearful: '😨',
  disgusted: '🤢',
  surprised: '😮',
  neutral: '😐',
};

const EmotionsPage: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/models'); // For face detection
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

      // Detect face and expressions
      const detections = await faceapi.detectSingleFace(video).withFaceExpressions();

      if (detections && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

          // Determine the dominant emotion
          const expressions = detections.expressions;
          const dominantEmotion = Object.keys(expressions).reduce((a, b) =>
            expressions[a as keyof faceapi.FaceExpressions] > expressions[b as keyof faceapi.FaceExpressions] ? a : b,
          ) as keyof faceapi.FaceExpressions;

          // Map the dominant emotion to an emoji
          const emoji = emotionEmojiMap[dominantEmotion] || '😐';

          // Get face position
          const dims = faceapi.matchDimensions(canvasRef.current, video, true);
          const resizedResult = faceapi.resizeResults(detections, dims);

          // Draw the emoji on the canvas at the center of the face
          const { x, y, width, height } = resizedResult.detection.box;
          ctx.font = `${Math.floor(height / 2)}px Arial`;
          ctx.fillText(emoji, x + width / 2 - 20, y + height / 2);
        }
      }
    }
  }, [modelsLoaded]);

  useEffect(() => {
    const interval = setInterval(() => {
      detect();
    }, 100);

    return () => clearInterval(interval);
  }, [detect]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50px',
      }}
    >
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        style={{
          width: 640,
          height: 480,
        }}
      />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{
          marginLeft: '20px', // Adds space between the video and the canvas
        }}
      />
    </div>
  );
};

export default EmotionsPage;
