import './RESPA.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'animate.css';

import { Link } from 'react-router-dom';
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';

import DayCard from '../../../../components/DayCard';
import bg from '../../../../images/respa/respa_days_bg.png';
import backBtn from '../../../../images/worlds/arrow_back.png';
import pageTitle from '../../../../images/worlds/title_sign.png';

register();

const RespaPage = () => {
  return (
    <div id="respa-page" style={{ backgroundImage: `url(${bg})` }}>
      <nav>
        <Link to="/worlds">
          <img className="animate__animated animate__lightSpeedInLeft" src={backBtn} alt="" />
        </Link>
        <figure className="animate__animated animate__bounceInDown">
          <img src={pageTitle} alt="" />
          <figcaption>Self-Mastery, Attitude & Confidence</figcaption>
        </figure>
      </nav>

      <div className="swiper-container animate__animated animate__fadeIn">
        <Swiper
          effect={'coverflow'}
          initialSlide={0}
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={30}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          navigation={true}
        >
          {[
            {},
            { locked: true },
            { locked: true },
            { locked: true },
            { locked: true },
            { locked: true },
            { locked: true },
            { locked: true },
            { locked: true },
            { locked: true },
          ].map((slide, index) => (
            <SwiperSlide key={`slide_${index}`}>
              <DayCard locked={slide.locked} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RespaPage;
