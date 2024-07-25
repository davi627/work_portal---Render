import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { url } from '../../utils/apiRequest';

const Resetpassword = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token } = useParams();

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${url}/auth/resetpassword/${token}`;
    const response = await axios.post(url, {
      password,
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
          <h2>New password</h2>
          <br />
          <label className="password">
            <b>Password</b>
          </label>
          <br />
          <input
            type="password"
            className="custom-input"
            placeholder="Enter the password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="submit">
            <b>Reset</b>
          </button>
          <br />

          {error && <span>{error}</span>}
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;
