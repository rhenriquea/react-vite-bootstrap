import './SimonSaysGame.scss';

import React, { useEffect, useState } from 'react';

const colors = ['red', 'green', 'blue', 'yellow'];

const SimonSaysGame: React.FC = () => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('Watch the sequence!');
  const [activeColor, setActiveColor] = useState<string | null>(null);

  useEffect(() => {
    if (sequence.length === 0) {
      addColorToSequence();
    }
  }, [sequence]);

  const addColorToSequence = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setSequence((prevSequence) => [...prevSequence, randomColor]);
  };

  const playSequence = async () => {
    setIsPlayerTurn(false);
    setMessage('Watch the sequence!');
    for (const color of sequence) {
      await flashColor(color);
    }
    setIsPlayerTurn(true);
    setMessage('Your turn!');
  };

  const flashColor = (color: string) => {
    return new Promise<void>((resolve) => {
      setActiveColor(color);
      setTimeout(() => {
        setActiveColor(null);
        setTimeout(resolve, 500);
      }, 1000);
    });
  };

  const handleColorClick = (color: string) => {
    if (!isPlayerTurn) return;

    const newUserSequence = [...userSequence, color];
    setUserSequence(newUserSequence);

    const isCorrect = newUserSequence.every((color, index) => color === sequence[index]);

    if (!isCorrect) {
      setMessage('Wrong sequence! Game Over!');
      setIsPlayerTurn(false);
    } else if (newUserSequence.length === sequence.length) {
      setMessage('Good job! Get ready for the next round.');
      setTimeout(() => {
        setUserSequence([]);
        addColorToSequence();
        playSequence();
      }, 1000);
    }
  };

  useEffect(() => {
    if (sequence.length > 0) {
      playSequence();
    }
  }, [sequence]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Simon Says Game</h1>
      <h2>{message}</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        {colors.map((color) => (
          <div
            key={color}
            id={color}
            onClick={() => handleColorClick(color)}
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: color,
              opacity: isPlayerTurn ? 1 : 0.6,
              cursor: isPlayerTurn ? 'pointer' : 'default',
              transition: 'opacity 0.3s, border 0.3s',
              border: activeColor === color ? '10px solid white' : '5px solid black',
              boxSizing: 'border-box',
            }}
            className="color-button"
          />
        ))}
      </div>
    </div>
  );
};

export default SimonSaysGame;
