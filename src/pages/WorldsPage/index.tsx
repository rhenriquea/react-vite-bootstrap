import './WorldsPage.scss';

import world1 from './images/world_1.png';
import world2 from './images/world_2.png';
import world3 from './images/world_3.png';
import bg from './images/worlds_page_bg.png';

const WorldsPage = () => {
  return (
    <>
      <div id="worlds_page">
        <div className="worlds_container">
          <div className="world_1">
            <img src={world1} />
          </div>
          <div className="world_2">
            <img src={world2} />
          </div>
          <div className="world_3">
            <img src={world3} />
          </div>
        </div>
        <img className="page-background" src={bg} />
      </div>
    </>
  );
};

export default WorldsPage;
