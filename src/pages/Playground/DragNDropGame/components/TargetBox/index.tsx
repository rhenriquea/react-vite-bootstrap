import React from 'react';
import { useDrop } from 'react-dnd';

interface TargetBoxProps {
  onDrop: (color: string) => void;
}

const TargetBox: React.FC<TargetBoxProps> = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'box',
    drop: (item: { color: string }) => onDrop(item.color),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        width: '300px',
        height: '150px',
        border: '2px dashed black',
        backgroundColor: isOver ? '#f0f0f0' : 'white',
        margin: '20px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      Drop Here
    </div>
  );
};

export default TargetBox;
