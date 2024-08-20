import './Worlds.scss';
import 'animate.css';

import World, { WorldProps } from '../../components/World';
import courHead from '../../images/worlds/cour_head.png';
import faihoHead from '../../images/worlds/faiho_head.png';
import gratiHead from '../../images/worlds/grati_head.png';
import inrockHead from '../../images/worlds/inrock_head.png';
import respaHead from '../../images/worlds/respa_head.png';
import world1Bg from '../../images/worlds/world_1.png';
import world2Bg from '../../images/worlds/world_2.png';
import world3Bg from '../../images/worlds/world_3.png';
import bg from '../../images/worlds/worlds_page_bg.png';

const worldsData: WorldProps[] = [
  {
    bgImage: world1Bg,
    title: 'Self-Mastery, Attitude & Confidence',
    links: [
      { name: 'respa', img: respaHead, disabled: false },
      { name: 'inrock', img: inrockHead, disabled: true },
      { name: 'cour', img: courHead, disabled: true },
      { name: 'grati', img: gratiHead, disabled: true },
      { name: 'faiho', img: faihoHead, disabled: true },
    ],
  },
  {
    bgImage: world2Bg,
    title: 'Mindfulness, Emotional Control, Accountability & Teamwork',
    links: [
      { name: 'respa', img: respaHead, disabled: true },
      { name: 'inrock', img: inrockHead, disabled: true },
      { name: 'cour', img: courHead, disabled: true },
      { name: 'grati', img: gratiHead, disabled: true },
      { name: 'faiho', img: faihoHead, disabled: true },
    ],
  },
  {
    bgImage: world3Bg,
    title: 'Goal Setting, Mental Imagery & Commitment',
    links: [
      { name: 'respa', img: respaHead, disabled: true },
      { name: 'inrock', img: inrockHead, disabled: true },
      { name: 'cour', img: courHead, disabled: true },
      { name: 'grati', img: gratiHead, disabled: true },
      { name: 'faiho', img: faihoHead, disabled: true },
    ],
  },
];

const WorldsPage = () => {
  return (
    <div id="worlds_page">
      <div className="worlds_container">
        {worldsData.map((world, index) => (
          <div
            key={index}
            className={`world world--${index + 1} animate__animated animate__fadeInDown animate__faster animate__delay-${index}s`}
          >
            <World {...world} />
          </div>
        ))}
      </div>
      <img className="page-background" src={bg} alt="Worlds Background" />
    </div>
  );
};

export default WorldsPage;
