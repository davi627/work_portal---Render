import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './progress.css';
import { Link } from 'react-router-dom';

function Progress() {
  const [apply, setApply] = useState([]);
  const [error, setError] = useState('');
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchApply = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/apply/getapplication'
        );
        setApply(response.data);
      } catch (error) {
        setError('Failed to fetch applications');
      }
    };

    fetchApply();
  }, []);

  const handleApprove = async (email) => {
    try {
      const res = await axios.post('http://localhost:3000/apply/approve', {
        email,
      });
      if (res.status === 200) {
        alert('Application approved');
      }
    } catch (error) {
      console.error('Failed to approve application:', error);
      alert('Failed to approve application');
    }
  };

  return (
    <div className="applications-list">
      <h2>Job Applications</h2>
      <button>
        <Link to={'/track'}>progress</Link>
      </button>
      {error && <p className="error">{error}</p>}
      <ul>
        {apply.map((app) => (
          <li key={app._id}>
            <h3>{app.name}</h3>

            <p>Location: {app.location}</p>
            <p>Code: {app.code}</p>
            <p>Experience: {app.experience}</p>
            <button onClick={() => handleApprove(app.email)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Progress;
