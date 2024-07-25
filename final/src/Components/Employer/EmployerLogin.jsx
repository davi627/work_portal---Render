import React, { useState } from 'react';
import './Employer.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { url } from '../../utils/apiRequest';

const EmployerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const urll = `${url}/auth/employerlogin`;
    try {
      const response = await axios.post(urll, {
        username,
        password,
      });

      if (response.data.status) {
        // Make sure to check response.data.status
        console.log(response.data.existingUser);
        localStorage.setItem(
          'employer',
          JSON.stringify(response.data.existingUser)
        );
        navigate('/ehome');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
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
        <button className="submit" disabled={loading}>
          {loading ? <ClipLoader size={24} color={'#fff'} /> : 'Login'}
        </button>
        <br />
        <Link to="/eforgotpassword">
          <em>Forgot password</em>
        </Link>
        <p>You don't have an account?</p>
        <Link to="/eregister">
          <b>Register</b>
        </Link>
        {error && <span className="error">{error}</span>}
      </form>
    </div>
  );
};

export default EmployerLogin;
