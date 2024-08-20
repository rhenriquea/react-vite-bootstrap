import './DayCard.scss';

import { FC } from 'react';
import { Link } from 'react-router-dom';

import playBtn from '../../images/respa/play.png';
import respa from '../../images/respa/respa.png';
import cardbg from '../../images/respa/slide_bg.png';
import chains from '../../images/worlds/chains.png';

interface DayCardProps extends React.PropsWithChildren {
  index: number;
  locked?: boolean;
}

const DayCard: FC<DayCardProps> = (props) => {
  return (
    <>
      <div id="day-card-component" style={{ backgroundImage: `url(${cardbg})` }}>
        {props.locked ? <img className="locked-card" src={chains} /> : <></>}
        <h2>RESPA</h2>
        <h3>The Crocodile</h3>
        <figure className="character-figure">
          <img src={respa} alt="" />
        </figure>
        <h4>Day {props.index + 1}</h4>

        <Link className="play-btn" role="button" to={`/worlds/respa/${props.index + 1}`}>
          Play
          <img src={playBtn} alt="Play" />
        </Link>
      </div>
    </>
  );
};

export default DayCard;
