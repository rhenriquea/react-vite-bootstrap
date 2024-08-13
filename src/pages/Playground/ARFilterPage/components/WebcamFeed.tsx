import * as faceapi from 'face-api.js';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Webcam from 'react-webcam';

import ARFilter from './ARFilter';
import mustache from './mustache.png';

const WebcamFeed: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [filterPosition, setFilterPosition] = useState({ x: 270, y: 300 });
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadModels = async () => {
      if (!faceapi.nets.tinyFaceDetector.isLoaded) {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      }
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
      const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions());

      if (detections) {
        const { x, y } = detections.box;
        setFilterPosition({ x: x + 100, y: y + detections.box.height / 2 });
      }
    }
  }, [modelsLoaded]);

  useEffect(() => {
    const interval = setInterval(() => {
      detect();
    }, 100);

    return () => clearInterval(interval);
  }, [detect]);

  const captureScreenshot = useCallback(() => {
    if (webcamRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context && webcamRef.current.video) {
        // Draw the webcam feed to the canvas
        context.drawImage(webcamRef.current.video, 0, 0, canvas.width, canvas.height);

        // Draw the AR filter (in this case, a simple image) to the canvas
        const img = new Image();
        img.src = mustache; // Replace with your filter image path

        img.onload = () => {
          context.drawImage(img, filterPosition.x, filterPosition.y, 100, 50); // Adjust filter position and size

          // Get the data URL of the combined image
          const imageSrc = canvas.toDataURL('image/jpeg');
          setScreenshot(imageSrc);
        };

        img.onerror = (err) => {
          console.error('Failed to load filter image:', err);
        };
      } else {
        console.error('Canvas context or webcam video is not available.');
      }
    }
  }, [filterPosition]);

  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
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
        style={{ display: 'none' }} // Hide the canvas element
      />
      <ARFilter x={filterPosition.x} y={filterPosition.y} />

      {/* Button to capture screenshot */}
      <button
        onClick={captureScreenshot}
        style={{
          position: 'relative',
          zIndex: 10,
          marginTop: '500px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Capture Screenshot
      </button>

      {/* Display the screenshot if available */}
      {screenshot && (
        <div style={{ marginTop: '20px' }}>
          <h3>Screenshot</h3>
          <img src={screenshot} alt="Screenshot" style={{ width: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default WebcamFeed;
