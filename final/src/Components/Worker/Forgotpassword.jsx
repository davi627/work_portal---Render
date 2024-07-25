import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { url } from '../../utils/apiRequest';

const Forgotpassword = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const urll = `${url}/auth/forgotpassword`;
    const response = await axios.post(urll, {
      username,
    });
    console.log(response);
    try {
      navigate('/login');
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <div>
      <div className="login-container">
        <form className="logform" onSubmit={handleSubmit}>
          <h2>Reset password</h2>
          <br />
          <label className="username">
            <b>Username/Email</b>
          </label>
          <br />
          <input
            type="text"
            className="custom-input"
            placeholder="Enter username/email"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <button className="submit">
            <b>send</b>
          </button>
          <br />

          {error && <span>{error}</span>}
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;
