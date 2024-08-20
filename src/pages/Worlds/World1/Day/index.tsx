import './Day.scss';
import 'animate.css';

import { Link } from 'react-router-dom';

import playIcom from '../../../../images/respa/play.png';
import respa from '../../../../images/respa/respa.png';
import bg from '../../../../images/respa/respa_day.png';
import backBtn from '../../../../images/worlds/arrow_back.png';

const DayPage = () => {
  return (
    <div id="day-page" style={{ backgroundImage: `url(${bg})` }}>
      <nav>
        <Link to="/worlds">
          <img className="animate__animated animate__lightSpeedInLeft" src={backBtn} alt="" />
        </Link>
      </nav>

      <div className="animate__animated animate__fadeIn">
        <figure className="character-figure">
          <img src={respa} alt="" />
        </figure>

        <button className="play-btn" role="button">
          Play
          <img src={playIcom} alt="Play" />
        </button>
      </div>

      <figure className="character-figure">
        <img src={respa} alt="" />
      </figure>
    </div>
  );
};

export default DayPage;
