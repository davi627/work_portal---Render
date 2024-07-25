import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGardening } from '../../features/gardening/gardeningSlice';
import './gardening.css';
import DOMPurify from 'dompurify';
import ApplyForm from '../Applyform/Applyform';
import { url } from '../../utils/apiRequest';

function Gardening() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchGardeningData = async () => {
      try {
        const res = await axios.get(`${url}/jobs/gardening`);
        if (res.status === 200) {
          dispatch(setGardening(res.data));
          setData(res.data);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchGardeningData();
  }, [dispatch]);
  const handleApplyClick = (job) => {
    setSelectedJob(job);
  };

  const handleClosePopup = () => {
    setSelectedJob(null);
  };

  return (
    <div className="gardening">
      {data &&
        data.map((dt) => (
          <div className="dt" key={dt._id}>
            <div className="data-title">Title: {dt.title}</div>
            <div className="images">
              {dt.images.map((image, index) => (
                <img
                  src={image}
                  alt={`Job Image ${index + 1}`}
                  key={index}
                  className="job-image"
                />
              ))}
            </div>
            <div className="details-grid">
              <p>Price: {dt.price}</p>
              <p>Location: {dt.location}</p>
              <p>People: {dt.people}</p>
              <p>Contact: {dt.contact}</p>
              <p>Environment: {dt.environment}</p>
              <p>Equipment: {dt.equipment}</p>
              <p>
                Description:
                <span
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(dt.description),
                  }}
                ></span>
              </p>
              <p>Days: {dt.days}</p>
              <p>Start Time: {dt.startTime}</p>
              <p>End Time: {dt.endTime}</p>
              <p>code: {dt.code}</p>
              <p>date: {dt.date}</p>
            </div>
            <button
              className="apply-button"
              onClick={() => handleApplyClick(dt)}
            >
              Apply
            </button>
          </div>
        ))}
      {error && <span>{error}</span>}
      {selectedJob && (
        <ApplyForm job={selectedJob} onClose={handleClosePopup} />
      )}
    </div>
  );
}

export default Gardening;
