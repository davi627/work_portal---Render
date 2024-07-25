import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; // Import ClipLoader
import './accept.css';
import { url } from '../../utils/apiRequest';

const Accept = () => {
  const [status, setStatus] = useState('');
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  useEffect(() => {
    const accept = async () => {
      const email = searchParams.get('email');
      console.log('email: ', email);
      const token = searchParams.get('token');
      console.log('token: ', token);

      if (email && token) {
        try {
          setLoading(true); // Start loading
          const response = await axios.post(`${url}/apply/accept`, {
            email,
            token,
          });
          if (response.status === 200) {
            setStatus('Offer accepted successfully.');
          } else {
            setStatus('Failed to accept the offer.');
          }
        } catch (error) {
          console.error('Error accepting the offer:', error);
          setStatus('Failed to accept the offer.');
        } finally {
          setLoading(false); // Stop loading
        }
      }
    };

    accept();
  }, [searchParams]);

  const handleFeedback = async () => {
    try {
      setLoading(true); // Start loading
      const userJson = localStorage.getItem('employer');
      console.log('userJson:', userJson);
      if (!userJson) {
        throw new Error('User data not found in local storage');
      }

      let user;
      try {
        user = JSON.parse(userJson);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        throw new Error('Failed to parse user data from local storage');
      }

      const username = user?.username;
      if (!username) {
        throw new Error('Username not found in user data');
      }

      const res = await axios.post(`${url}/auth/feedback`, {
        username,
      });
      if (res.status === 200) {
        alert('Feedback submitted successfully');
        navigate('/reportprogress');
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Failed to give feedback:', error);
      setError(error.message);
      alert(`Failed to give feedback: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <div className="status">{status}</div>
      <button className="accept" onClick={handleFeedback} disabled={loading}>
        {loading ? <ClipLoader size={20} color="#fff" /> : 'Accept'}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Accept;
