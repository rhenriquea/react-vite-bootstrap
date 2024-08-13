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

const MoneyGamePage: React.FC = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [model, setModel] = useState<any>(null);

  // Game related logic
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [moneyOnScreen, setMoneyOnScreen] = useState(false);
  const [moneyPosition, setMoneyPosition] = useState({ top: 0, left: 0 });
  const [score, setScore] = useState(0);
  const [moneyCount, setMoneyCount] = useState(0);
  const maxMoney = 100;

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
  const detect = useCallback(
    async (net: any) => {
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
        const openHand = predictions.find((obj) => obj.label === 'open');
        const pointHand = predictions.find((obj) => obj.label === 'point');

        if (closedHand && moneyOnScreen) {
          setScore((prevScore) => prevScore + 1);
          setMoneyOnScreen(false); // Remove the money from the screen after scoring
        }

        // Helper function to debug predictions
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            const LOGS = true;

            if (LOGS) {
              if (closedHand) {
                const [x, y, width, height] = closedHand.bbox;
                ctx.beginPath();
                ctx.arc(x + width / 2, y + height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI); // Draw a circle on the hand
                ctx.fillStyle = 'red'; // Semi-transparent red color
                ctx.fill();
              }

              if (openHand) {
                const [x, y, width, height] = openHand.bbox;
                ctx.beginPath();
                ctx.arc(x + width / 2, y + height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI); // Draw a circle on the hand
                ctx.fillStyle = 'green'; // Semi-transparent red color
                ctx.fill();
              }

              if (pointHand) {
                const [x, y, width, height] = pointHand.bbox;
                ctx.beginPath();
                ctx.arc(x + width / 2, y + height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI); // Draw a circle on the hand
                ctx.fillStyle = 'blue'; // Semi-transparent red color
                ctx.fill();
              }
            }

            // Helper function to debug predictions, Render the predictions on the canvas
            // net.renderPredictions(predictions, canvasRef.current, ctx, video);
          }
        }

        /* if (canvasRef.current && isClosed) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
              // Render the predictions on the canvas
              net.renderPredictions(predictions, canvasRef.current, ctx, video);
            }
          } */
      }
    },
    [moneyOnScreen],
  );

  // Run hand detection every 100 miliseconds
  useEffect(() => {
    if (isModelLoaded) {
      const interval = setInterval(() => {
        detect(model);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isModelLoaded, detect, model]);

  // Memoize the spawn money function to prevent unnecessary re-creations
  const spawnMoney = useCallback(() => {
    if (moneyCount < maxMoney) {
      const randomTop = Math.random() * 80 + 10; // Random position between 10% and 90% for top
      const randomLeft = Math.random() * 80 + 10; // Random position between 10% and 90% for left
      setMoneyPosition({ top: randomTop, left: randomLeft });

      setMoneyOnScreen(true);
      setMoneyCount((prevCount) => prevCount + 1);

      setTimeout(() => {
        if (moneyOnScreen) {
          setMoneyOnScreen(false); // Money disappears after a short period
        }
      }, 1000); // Adjust timing as needed
    }
  }, [moneyCount, maxMoney, moneyOnScreen]);

  useEffect(() => {
    if (moneyCount < maxMoney) {
      const moneyInterval = setInterval(() => {
        spawnMoney();
      }, 2000); // Adjust timing based on music rhythm

      return () => clearInterval(moneyInterval);
    }
  }, [moneyCount, maxMoney, spawnMoney]);

  return (
    <div>
      <h1>Score: {score}</h1>
      <Webcam ref={webcamRef} style={styles} />
      <canvas ref={canvasRef} style={styles} />
      {moneyOnScreen && (
        <div
          style={{
            ...styles,
            color: 'green',
            fontSize: '3rem',
            top: `${moneyPosition.top}%`,
            left: `${moneyPosition.left}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          💵
        </div>
      )}
    </div>
  );
};

export default MoneyGamePage;
