import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './report.css';
import axios from 'axios';
import UploadWidget from '../Upload/UploadWidget';
import { url } from '../../utils/apiRequest';

const Report = () => {
  const [percentage, setPercentage] = useState(0);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');

  const urll = `${url}/progress`;

  const sendProgressStatus = async (progressState) => {
    console.log(progressState);
    try {
      const res = await axios.post(urll, { progressState });
      if (res.status) {
        console.log(res.data.updateProgress);
      }
    } catch (error) {
      console.error('Failed to send progress:', error);
      setError(error.message);
    }
  };

  const updateUrl = `${url}/progress/updateProgress`;

  const updateProgressStatus = async (progressState) => {
    console.log(progressState);
    try {
      const res = await axios.put(updateUrl, { progressState });
      if (res.status) {
        console.log(res.data.updateProgress);
      }
    } catch (error) {
      console.error('Failed to send progress:', error);
      setError(error.message);
    }
  };

  const handleStart = () => {
    setPercentage(10);
    updateProgressStatus('Started');
  };

  const handleAlmost = () => {
    setPercentage(70);
    updateProgressStatus('Almost');
  };

  const handleFinish = () => {
    setPercentage(100);
    updateProgressStatus('Finished');
  };

  useEffect(() => {
    if (images?.length > 0) {
      axios
        .post(`${url}/progress/postImg`, { images })
        .then((response) => {
          console.log('data received from db', response.data);
          setImages([]);
        })
        .catch((error) => {
          console.error('Error saving image URL:', error);
          setError(error.message);
        });
    }
  }, [images]);

  return (
    <div className="center-container">
      <div style={{ width: 200, height: 200, marginBottom: '20px' }}>
        <CircularProgressbar value={percentage} text={`${percentage}%`} />
      </div>
      <button onClick={handleStart} className="button">
        Started
      </button>
      <button onClick={handleAlmost} className="button">
        Almost
      </button>
      <button onClick={handleFinish} className="button">
        Finished
      </button>
      {percentage === 100 && (
        <>
          <h3>When done, upload the images of finished work down here</h3>
          <div className="upload-button-container">
            <UploadWidget
              uwConfig={{
                multiple: true,
                cloudName: 'Mbita',
                uploadPreset: 'jobImages',
                folder: 'posts',
              }}
              setState={setImages}
            />
          </div>
        </>
      )}
      {error && <span>{error}</span>}
    </div>
  );
};

export default Report;
