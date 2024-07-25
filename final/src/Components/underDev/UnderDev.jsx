import axios from 'axios';
import './underdev.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApplyForm from '../Applyform/Applyform';
import DOMPurify from 'dompurify';
import { url } from '../../utils/apiRequest';

function UnderDev() {
  const jobs = useSelector((store) => store.jobSlice.jobs);
  const [alldata, setData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get(`${url}/jobs/allPosts`);
        if (res.status) {
          setData(res.data);
        } else {
          alert('error occurred');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    getdata();
  }, [jobs]);

  const handleApplyClick = (job) => {
    setSelectedJob(job); // Set the selected job to open the popup
  };

  const handleClosePopup = () => {
    setSelectedJob(null); // Close the popup
  };

  return (
    <div className="under">
      {alldata &&
        alldata.map((data) => (
          <div className="data" key={data._id}>
            <div className="data-title">Title: {data.title}</div>
            <div className="images">
              {data.images.map((image, index) => (
                <img
                  src={image}
                  alt={`Job Image ${index + 1}`}
                  key={index}
                  className="job-image"
                />
              ))}
            </div>
            <div className="data-container">
              <div className="data-item">
                <p>The Price: {data.price}</p>
                <p>Location: {data.location}</p>
                <p>People: {data.people}</p>
              </div>
              <div className="data-item">
                <p>Contact: {data.contact}</p>
                <p>Environment: {data.environment}</p>
                <p>Equipment: {data.equipment}</p>
              </div>
              <div className="data-item data-description">
                <p>
                  Description:
                  <span
                    className="description"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(data.description),
                    }}
                  ></span>
                </p>
              </div>
              <div className="data-item">
                <p>Days: {data.days}</p>
                <p>code: {data.code}</p>
              </div>
              <div className="data-item">
                <p>Start Time: {data.startTime}</p>
                <p>End Time: {data.endTime}</p>
                <p>Date: {data.date}</p>
              </div>
            </div>
            <button
              className="apply-button"
              onClick={() => handleApplyClick(data)}
            >
              Apply
            </button>
            <hr />
            {selectedJob && (
              <ApplyForm job={selectedJob} onClose={handleClosePopup} />
            )}
          </div>
        ))}
    </div>
  );
}

export default UnderDev;
