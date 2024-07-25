import axios from 'axios';
import './construction.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '../../features/singleJob/singleJobSlice';
import DOMPurify from 'dompurify';
import ApplyForm from '../Applyform/Applyform';
import { url } from '../../utils/apiRequest';

function Construction() {
  const singleJob = useSelector((store) => store.singleJobData.singleJob);
  const [error, setError] = useState('');

  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchSingleJobData = async () => {
      try {
        const res = await axios.get(`${url}/jobs/construction`);
        if (res.status) {
          dispatch(setSingleJob(res.data));
          setData(res.data);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchSingleJobData();
  }, [singleJob]);

  const handleApplyClick = (job) => {
    setSelectedJob(job); // Set the selected job to open the popup
  };

  const handleClosePopup = () => {
    setSelectedJob(null); // Close the popup
  };

  return (
    <div className="construction">
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

export default Construction;
