import React from 'react';
import { useDrag } from 'react-dnd';

interface ColorBoxProps {
  color: string;
}

const ColorBox: React.FC<ColorBoxProps> = ({ color }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: { color },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: color,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        margin: '0 10px',
      }}
    />
  );
};

export default ColorBox;
