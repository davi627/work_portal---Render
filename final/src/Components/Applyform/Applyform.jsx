import React, { useState, useEffect } from 'react';
import './ApplyForm.css';
import axios from 'axios';
import { url } from '../../utils/apiRequest';

function ApplyForm({ job, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    code: job.code, // Initialize code with job.code
    experience: '',
  });

  const [error, setError] = useState('');
  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
    onClose();
    try {
      const response = await axios.post(`${url}/apply/postapply`, formData);
      if (response.status) {
        console.log(response.data);
        alert('Job submitted successfully');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="popup-form">
      <div className="popup-content">
        <h2>Apply for {job.title}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            code:
            <input
              type="text"
              name="code"
              value={formData.code} // Use the initialized code
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Experience:
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              rows="5"
            />
          </label>
          <div className="buttons">
            <button type="submit" className="submit-button">
              Submit
            </button>
            <button type="button" onClick={onClose} className="close-button">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyForm;
