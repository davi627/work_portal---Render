import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { url } from '../../utils/apiRequest';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error('Passwords do not match!');
      return;
    }

    const response = await axios.post(`${url}/auth/register`, {
      username,
      password,
      confirmPassword,
    });
    try {
      alert('registered');
      navigate('/login');
    } catch (error) {
      console.log(error);
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
        <input type="submit" className="button" value="register" />
        <p>
          Have an account?<Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
