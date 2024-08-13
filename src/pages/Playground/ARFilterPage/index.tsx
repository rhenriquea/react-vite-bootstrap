import React from 'react';

import WebcamFeed from './components/WebcamFeed';

const ARFilterPage: React.FC = () => {
  return (
    <div style={{ width: '640px', height: '480px', position: 'relative' }}>
      <WebcamFeed />
      {/* <ARFilter x={270} y={300} /> */}
    </div>
  );
};

export default ARFilterPage;
