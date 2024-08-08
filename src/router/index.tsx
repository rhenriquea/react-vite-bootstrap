import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import WorldsPage from '../pages/WorldsPage';

const Router = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/worlds" element={<WorldsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
