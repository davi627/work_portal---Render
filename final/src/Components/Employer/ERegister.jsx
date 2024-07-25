import React, { useState } from 'react';
import './ERegister.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { url } from '../../utils/apiRequest';

const ERegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      console.error('Passwords do not match!');
      return;
    }

    const response = await axios.post(`${url}/auth/eregister`, {
      username,
      password,
      confirmPassword,
    });
    try {
      navigate('/employerlogin');
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
      setError(error);
    }
  };

  return (
    <div>
      <form className="regform" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label className="username">Username/Email</label>
        <br />
        <input
          type="text"
          className="custom-input"
          placeholder="Enter Username/Email"
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label className="password">Password</label>
        <br />
        <input
          type="password"
          className="custom-input"
          placeholder="Enter password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label className="password">Confirm Password</label>
        <br />
        <input
          type="password"
          className="custom-input"
          placeholder="Confirm password"
          name="confirmPassword"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <button type="submit" className="button" disabled={loading}>
          {loading ? <ClipLoader size={24} color={'#fff'} /> : 'Register'}
        </button>
        <p>
          Have an account?
          <Link to="/employerlogin">
            <b>Login</b>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ERegister;
