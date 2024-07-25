import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { url } from '../../utils/apiRequest';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urll = `${url}/auth/login`;
    try {
      const response = await axios.post(urll, {
        username,
        password,
      });

      if (response.data.status) {
        console.log(response.data);
        localStorage.setItem(
          'workUser',
          JSON.stringify(response.data.existingUser)
        );
        navigate('/home');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="logform" onSubmit={handleSubmit}>
        <h2>LOGIN</h2>
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
          <b>Login</b>
        </button>
        <br />
        <Link to="/forgotpassword">Forgot Password</Link>
        <h5>You don't have an account?</h5>
        <Link to="/register">Register</Link>
        {error && <span>{error}</span>}
      </form>
    </div>
  );
};

export default Login;
