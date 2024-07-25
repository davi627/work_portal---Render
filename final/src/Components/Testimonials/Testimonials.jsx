import React, { useRef } from 'react';
import './Testimonials.css';
import nexticon from '../../assets/nexticon.jpg';
import backicon from '../../assets/backicon.png';
import user1 from '../../assets/user1.jpg';
import user2 from '../../assets/user2.jpg';
import user3 from '../../assets/user3.jpg';
import user4 from '../../assets/user4.jpg';

const Testimonials = () => {
  const slider = useRef();
  let tx = 0;
  const slideForward = () => {
    if (tx > -50) {
      tx -= 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };
  const slideBackward = () => {
    if (tx < 0) {
      tx += 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };
  return (
    <div className="testimonials">
      <img src={nexticon} alt="" className="next-btn" onClick={slideForward} />
      <img src={backicon} alt="" className="back-btn" onClick={slideBackward} />
      <div className="slider">
        <ul ref={slider}>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user1} alt="" />
                <div>
                  <h3>Emma Jackson</h3>
                  <span>Baraton, Eldoret</span>
                </div>
              </div>
              <p>
                choosing to search for a job from this system was a game
                changer.There is a varriety of the jobs you can choose from so
                as to cater for your daily expenditure. Its a plus for this one
              </p>
            </div>
          </li>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user2} alt="" />
                <div>
                  <h3>Etale Bright</h3>
                  <span>Baraton, Eldoret</span>
                </div>
              </div>
              <p>
                choosing to search for a job from this system was a game
                changer.There is a varriety of the jobs you can choose from so
                as to cater for your daily expenditure. Its a plus for this one
              </p>
            </div>
          </li>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user3} alt="" />
                <div>
                  <h3>Favour Ochieng</h3>
                  <span>Baraton, Eldoret</span>
                </div>
              </div>
              <p>
                choosing to search for a job from this system was a game
                changer.There is a varriety of the jobs you can choose from so
                as to cater for your daily expenditure. Its a plus for this one
              </p>
            </div>
          </li>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user4} alt="" />
                <div>
                  <h3>Brian Jackson</h3>
                  <span>Baraton, Eldoret</span>
                </div>
              </div>
              <p>
                choosing to search for a job from this system was a game
                changer.There is a varriety of the jobs you can choose from so
                as to cater for your daily expenditure. Its a plus for this one
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Testimonials;
