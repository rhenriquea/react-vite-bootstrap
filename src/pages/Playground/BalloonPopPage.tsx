/* eslint-disable @typescript-eslint/no-explicit-any */
import * as handTrack from 'handtrackjs';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

interface Prediction {
  bbox: [number, number, number, number]; // Array of four numbers
  class: number; // Numeric class identifier
  label: string; // Label string (e.g., "face", "closed")
  score: string; // Confidence score represented as a string
}

type Predictions = Prediction[];

interface Balloon {
  id: number;
  left: number;
  speed: number;
}

const BalloonPopGamePage: React.FC = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [model, setModel] = useState<any>(null);

  // Game related logic
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [nextBalloonId, setNextBalloonId] = useState(1);
  const maxBalloons = 50;
  const baseSpeed = 1; // Base speed for balloon movement

  const styles: React.CSSProperties = {
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 9,
    width: 640,
    height: 480,
  };

  // Memoize the model loading function to prevent unnecessary re-creations
  const loadModel = useCallback(async () => {
    const loadedModel = await handTrack.load();
    setModel(loadedModel);
    setIsModelLoaded(true);
  }, []);

  // Load the model when the component mounts
  useEffect(() => {
    loadModel();
  }, [loadModel]);

  // Memoize the detection function to prevent unnecessary re-creations
  const detect = useCallback(async (net: any) => {
    // Check if streaming is happening from webcam
    if (webcamRef && webcamRef.current && webcamRef.current.video?.readyState === 4) {
      // Get video properties
      const { video } = webcamRef.current;
      const { videoHeight, videoWidth } = video;

      // Set video height and width
      video.height = videoHeight;
      video.width = videoWidth;

      // Set canvas height
      if (canvasRef && canvasRef.current) {
        canvasRef.current.height = videoHeight;
        canvasRef.current.width = videoHeight;
      }

      // Detect hand poses
      const predictions: Predictions = await net.detect(video);

      const closedHand = predictions.find((obj) => obj.label === 'closed');

      if (closedHand) {
        const [handX, handY, handWidth, handHeight] = closedHand.bbox;
        const handCenterX = handX + handWidth / 2;
        const handCenterY = handY + handHeight / 2;

        setBalloons((prevBalloons) =>
          prevBalloons.filter((balloon) => {
            const balloonLeft = (balloon.left * videoWidth) / 100;
            const balloonTop = ((100 - balloon.speed * balloon.id) * videoHeight) / 100;
            const isCaught =
              handCenterX > balloonLeft - 30 &&
              handCenterX < balloonLeft + 30 &&
              handCenterY > balloonTop - 30 &&
              handCenterY < balloonTop + 30;

            if (isCaught) {
              setScore((prevScore) => prevScore + 1);
              return false; // Remove balloon if caught
            }

            return true;
          }),
        );
      }

      // Render the predictions on the canvas
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          if (closedHand) {
            const [x, y, width, height] = closedHand.bbox;
            ctx.beginPath();
            ctx.arc(x + width / 2, y + height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill();
          }
        }
      }
    }
  }, []);

  // Run hand detection every 100 milliseconds
  useEffect(() => {
    if (isModelLoaded) {
      const interval = setInterval(() => {
        detect(model);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isModelLoaded, detect, model]);

  // Memoize the spawn balloon function to prevent unnecessary re-creations
  const spawnBalloon = useCallback(() => {
    if (balloons.length < maxBalloons) {
      const randomLeft = Math.random() * 80 + 10; // Random position between 10% and 90% for left
      const speed = baseSpeed + score * 0.1; // Increase speed based on score

      setBalloons((prevBalloons) => [...prevBalloons, { id: nextBalloonId, left: randomLeft, speed: speed }]);
      setNextBalloonId((prevId) => prevId + 1);
    }
  }, [balloons.length, maxBalloons, score, nextBalloonId]);

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      spawnBalloon();
    }, 2000); // Adjust timing as needed

    return () => clearInterval(spawnInterval);
  }, [spawnBalloon]);

  // Update the position of the balloons
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setBalloons((prevBalloons) =>
        prevBalloons.map((balloon) => ({
          ...balloon,
          speed: balloon.speed,
        })),
      );
    }, 100);

    return () => clearInterval(moveInterval);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <h1>Score: {score}</h1>
      <Webcam ref={webcamRef} style={styles} />
      <canvas ref={canvasRef} style={styles} />
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          style={{
            ...styles,
            color: 'red',
            fontSize: '3rem',
            top: `${100 - balloon.speed * balloon.id}%`, // Balloons rise from the bottom
            left: `${balloon.left}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'top 0.1s linear',
          }}
        >
          🎈
        </div>
      ))}
    </div>
  );
};

export default BalloonPopGamePage;
