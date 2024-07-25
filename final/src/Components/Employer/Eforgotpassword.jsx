import React, { useState } from 'react';
import './Employer.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { url } from '../../utils/apiRequest';

const Eforgotpassword = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const urll = `${url}/auth/eforgotpassword`;
    const response = await axios.post(urll, {
      username,
    });
    console.log(response);
    try {
      navigate('/employerlogin');
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
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
          <button className="submit" disabled={loading}>
            {loading ? <ClipLoader size={24} color={'#fff'} /> : 'send'}
          </button>
          <br />

          {error && <span>{error}</span>}
        </form>
      </div>
    </div>
  );
};

export default Eforgotpassword;
