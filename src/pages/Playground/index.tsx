import './Playground.scss';

import { Link } from 'react-router-dom';

const PlaygroundPage = () => {
  return (
    <div id="playground-page">
      <h1>Playground</h1>
      <nav>
        <ul>
          <li>
            <Link to="concentration">Concentration Game</Link>
          </li>
          <li>
            <Link to="drop">DragNDrop Game</Link>
          </li>
          <li>
            <Link to="money">Money Game</Link>
          </li>
          <li>
            <Link to="typing">Typing Game</Link>
          </li>
          <li>
            <Link to="simonsays">Simon Says Game</Link>
          </li>
          <li>
            <Link to="filters">Filter AR</Link>
          </li>
          <li>
            <Link to="emotions">Emotions</Link>
          </li>
          <li>
            <Link to="yesno">Yes or No</Link>
          </li>
        </ul>
      </nav>
      <hr />
    </div>
  );
};

export default PlaygroundPage;
