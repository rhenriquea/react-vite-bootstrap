import React, { useEffect, useRef, useState } from 'react';

interface Word {
  text: string;
  id: number;
  top: number;
}

const TypingGamePage: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [missedWords, setMissedWords] = useState<number>(0);
  const [nextWordId, setNextWordId] = useState<number>(1);
  const inputRef = useRef<HTMLInputElement>(null);

  const wordList = [
    'hello',
    'world',
    'react',
    'typescript',
    'coding',
    'game',
    'fun',
    'challenge',
    'developer',
    'keyboard',
  ];

  useEffect(() => {
    const spawnWord = () => {
      const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
      setWords((prevWords) => [...prevWords, { text: randomWord, id: nextWordId, top: 0 }]);
      setNextWordId((prevId) => prevId + 1);
    };

    const spawnInterval = setInterval(spawnWord, 3000); // Adjust timing as needed

    return () => clearInterval(spawnInterval);
  }, [nextWordId]);

  useEffect(() => {
    const moveWords = () => {
      setWords((prevWords) =>
        prevWords.map((word) => ({
          ...word,
          top: word.top + 5,
        })),
      );
    };

    const moveInterval = setInterval(moveWords, 500);

    return () => clearInterval(moveInterval);
  }, []);

  useEffect(() => {
    const checkMissedWords = () => {
      setWords((prevWords) => {
        const remainingWords = prevWords.filter((word) => word.top < 90);

        if (remainingWords.length < prevWords.length) {
          setMissedWords((prevMissed) => prevMissed + (prevWords.length - remainingWords.length));
        }

        return remainingWords;
      });
    };

    const checkInterval = setInterval(checkMissedWords, 100);

    return () => clearInterval(checkInterval);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    setWords((prevWords) => {
      const matchingWordIndex = prevWords.findIndex((word) => word.text === newValue);

      if (matchingWordIndex !== -1) {
        setScore((prevScore) => prevScore + 1);
        setInputValue('');
        return prevWords.filter((_, index) => index !== matchingWordIndex);
      }

      return prevWords;
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Typing Game</h1>
      <h2>Score: {score}</h2>
      <h2>Missed: {missedWords}</h2>
      <div
        style={{
          position: 'relative',
          height: '400px',
          backgroundColor: '#f0f0f0',
          margin: '0 auto',
          width: '80%',
          overflow: 'hidden',
        }}
      >
        {words.map((word) => (
          <div
            key={word.id}
            style={{
              position: 'absolute',
              /*               left: `${Math.random() * 80}%`, */
              top: `${word.top}%`,
              fontSize: '1.5rem',
              color: 'black',
            }}
          >
            {word.text}
          </div>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        style={{ marginTop: '20px', padding: '10px', fontSize: '1.5rem' }}
      />
    </div>
  );
};

export default TypingGamePage;
