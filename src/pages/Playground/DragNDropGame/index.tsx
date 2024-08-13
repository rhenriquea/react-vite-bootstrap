import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import ColorBox from './components/ColorBox';
import TargetBox from './components/TargetBox';

const DragNDropGamePage: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('');

  const handleDrop = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Drag and Drop Color Game</h1>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
          <div style={{ opacity: selectedColor === 'red' ? 0 : 1 }}>
            <ColorBox color="red" />
          </div>
          <div style={{ opacity: selectedColor === 'green' ? 0 : 1 }}>
            <ColorBox color="green" />
          </div>
          <div style={{ opacity: selectedColor === 'blue' ? 0 : 1 }}>
            <ColorBox color="blue" />
          </div>
        </div>
        <TargetBox onDrop={handleDrop} />
        {selectedColor && <h2>You have selected {selectedColor}!</h2>}
        <button style={{ marginTop: '16px' }} onClick={() => setSelectedColor('')}>
          Reset
        </button>
      </div>
    </DndProvider>
  );
};

export default DragNDropGamePage;
