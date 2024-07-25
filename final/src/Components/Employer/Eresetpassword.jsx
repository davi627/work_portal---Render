import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { url } from '../../utils/apiRequest';

const Eresetpassword = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const urll = `${url}/auth/eresetpassword/${token}`;
    try {
      const response = await axios.post(urll, {
        password,
      });
      console.log(response);
      navigate('/employerlogin');
    } catch (error) {
      console.log(error);
      setError('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="login-container">
        <form className="logform" onSubmit={handleSubmit}>
          <br />
          <label className="password">
            <b> New Password</b>
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
          <button className="submit" disabled={loading}>
            {loading ? <ClipLoader size={24} color={'#fff'} /> : 'Reset'}
          </button>
          <br />
          {error && <span>{error}</span>}
        </form>
      </div>
    </div>
  );
};

export default Eresetpassword;
