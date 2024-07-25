import axios from 'axios';
import React from 'react';
import './home.css';
import { Link, useNavigate } from 'react-router-dom';
import gallery from '../../assets/gallery3.jpg';
import gaden from '../../assets/gn.webp';
import laundry from '../../assets/laundry.jpg';
import wk from '../../assets/wk.jpg';
import { url } from '../../utils/apiRequest';

const Home = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios
      .get(`${url}/auth/logout`)
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          navigate('/login');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="whole">
      <div className="header">
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="category-header">
        <h1>Check the work according to categories</h1>
      </div>
      <div className="works">
        <div className="work">
          <h4>Construction Work</h4>
          <img src={gallery} alt="Construction" />
          <div className="overlay">
            <div className="text">
              <Link to={'/construction'}>Construction works</Link>
            </div>
          </div>
        </div>
        <div className="work">
          <h4>Gardening Work</h4>
          <img src={gaden} alt="Gardening" />
          <div className="overlay">
            <div className="text">
              <Link to={'/gardening'}>Gardening works</Link>
            </div>
          </div>
        </div>
        <div className="work">
          <h4>Laundry Work</h4>
          <img src={laundry} alt="Laundry" />
          <div className="overlay">
            <div className="text">
              <Link to={'/laundry'}>Laundry services</Link>
            </div>
          </div>
        </div>
        <div className="work">
          <h4>All Categories</h4>
          <img src={wk} alt="Laundry" />
          <div className="overlay">
            <div className="text">
              <Link to={'/underdev'}>All Works</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
