import React from 'react';

import mustache from './mustache.png';

interface ARFilterProps {
  x: number;
  y: number;
}

const ARFilter: React.FC<ARFilterProps> = ({ x, y }) => {
  return (
    <img
      src={mustache}
      alt="Mustache"
      id="Moustac"
      style={{
        position: 'absolute',
        top: `${y}px`,
        left: `${x}px`,
        width: '100px',
        height: '50px',
        zIndex: 9,
      }}
    />
  );
};

export default ARFilter;
