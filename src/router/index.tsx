import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from '../pages/Login';
import PlaygroundPage from '../pages/Playground';
import ARFilterPage from '../pages/Playground/ARFilterPage';
import ConcentrationGame from '../pages/Playground/ConcentrationGame';
import DragNDropGamePage from '../pages/Playground/DragNDropGame';
import EmotionsPage from '../pages/Playground/EmotionsPage';
import MoneyGamePage from '../pages/Playground/MoneyGamePage';
import SimonSaysGame from '../pages/Playground/SimonSaysGame';
import TypingGamePage from '../pages/Playground/TypingGamePage';
import YesNoGame from '../pages/Playground/YesNoGame';
import WorldsPage from '../pages/Worlds';
import RespaPage from '../pages/Worlds/World1/RESPA';

const Router = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/worlds" element={<WorldsPage />} />
          <Route path="/worlds/respa" element={<RespaPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/playground/concentration" element={<ConcentrationGame />} />
          <Route path="/playground/drop" element={<DragNDropGamePage />} />
          <Route path="/playground/filters" element={<ARFilterPage />} />
          <Route path="/playground/emotions" element={<EmotionsPage />} />
          <Route path="/playground/money" element={<MoneyGamePage />} />
          <Route path="/playground/typing" element={<TypingGamePage />} />
          <Route path="/playground/simonsays" element={<SimonSaysGame />} />
          <Route path="/playground/yesno" element={<YesNoGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
