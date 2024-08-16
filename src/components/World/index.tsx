import './World.scss';

import { FC } from 'react';
import { Link } from 'react-router-dom';

interface WorldLink {
  name: string;
  img: string;
  disabled: boolean;
}

export interface WorldProps {
  bgImage: string;
  links: WorldLink[];
  title: string;
}

const World: FC<WorldProps> = ({ bgImage, links, title }) => {
  return (
    <div className="world-component">
      <header className="world-information">
        <h2 className="world-title">{title}</h2>
        <div className="world-links">
          {links.map(({ name, img, disabled }) => (
            <Link key={name} to={`/worlds/${name}`} aria-disabled={disabled}>
              <figure>
                <img src={img} alt={`${name} world`} />
              </figure>
            </Link>
          ))}
        </div>
      </header>
      <img src={bgImage} alt={`${title} background`} />
    </div>
  );
};

export default World;
