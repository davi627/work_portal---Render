import React from 'react';
import './work.css';
import gallery from '../../assets/gallery3.jpg';
import gaden from '../../assets/gn.webp';
import laundry from '../../assets/laundry.jpg';

const Work = () => {
  return (
    <div className="works container">
      <div className="work">
        <img src={gallery} alt="" />
        <div className="overlay">
          <div className="text">construction works</div>
        </div>
      </div>
      <div className="work">
        <img src={gaden} alt="" />
        <div className="overlay">
          <div className="text">Gardening works</div>
        </div>
      </div>
      <div className="work">
        <img src={laundry} alt="" />
        <div className="overlay">
          <div className="text">Laundry services</div>
        </div>
      </div>
    </div>
  );
};

export default Work;
