import React, { useEffect, useState } from 'react';

const gridSize = 10;
const wordList = ['react', 'typescript', 'coding', 'game', 'fun'];

interface GridCell {
  letter: string;
  selected: boolean;
}

const WordSearchGame: React.FC = () => {
  const [grid, setGrid] = useState<GridCell[][]>([]);
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [foundWords, setFoundWords] = useState<string[]>([]);

  const initializeGrid = () => {
    const newGrid: GridCell[][] = Array(gridSize)
      .fill(null)
      .map(() =>
        Array(gridSize)
          .fill(null)
          .map(() => ({ letter: '', selected: false })),
      );

    wordList.forEach((word) => {
      placeWordInGrid(word, newGrid);
    });

    // Fill empty cells with random letters
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (!newGrid[i][j].letter) {
          newGrid[i][j].letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }

    setGrid(newGrid);
  };

  const placeWordInGrid = (word: string, newGrid: GridCell[][]) => {
    const direction = Math.floor(Math.random() * 2); // 0: horizontal, 1: vertical
    const startRow = Math.floor(Math.random() * (gridSize - (direction === 0 ? word.length : 0)));
    const startCol = Math.floor(Math.random() * (gridSize - (direction === 1 ? word.length : 0)));

    for (let i = 0; i < word.length; i++) {
      if (direction === 0) {
        newGrid[startRow][startCol + i].letter = word[i].toUpperCase();
      } else {
        newGrid[startRow + i][startCol].letter = word[i].toUpperCase();
      }
    }
  };

  const handleCellClick = (row: number, col: number) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[row][col].selected = !newGrid[row][col].selected;
      return newGrid;
    });

    const selectedLetter = grid[row][col].letter;
    setSelectedWord((prevWord) => prevWord + selectedLetter);

    if (wordList.includes(selectedWord.toLowerCase()) && !foundWords.includes(selectedWord)) {
      setFoundWords([...foundWords, selectedWord]);
      setSelectedWord('');
    }
  };

  useEffect(() => {
    initializeGrid();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Word Search Game</h1>
      <h2>Find the following words:</h2>
      <ul>
        {wordList.map((word) => (
          <li key={word} style={{ textDecoration: foundWords.includes(word.toUpperCase()) ? 'line-through' : 'none' }}>
            {word}
          </li>
        ))}
      </ul>
      <div style={{ display: 'inline-block' }}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                style={{
                  width: '30px',
                  height: '30px',
                  border: '1px solid black',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: cell.selected ? 'lightblue' : 'white',
                  cursor: 'pointer',
                }}
              >
                {cell.letter}
              </div>
            ))}
          </div>
        ))}
      </div>
      <h3>Selected Word: {selectedWord}</h3>
      {foundWords.length === wordList.length && <h2>Congratulations! You found all the words!</h2>}
    </div>
  );
};

export default WordSearchGame;
