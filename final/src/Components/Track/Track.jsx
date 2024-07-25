import { useEffect, useState } from 'react';
import axios from 'axios';
import './Track.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { url } from '../../utils/apiRequest';

const Track = () => {
  const [percentage, setPercentage] = useState(0);
  const [error, setError] = useState('');
  const [progStateValue, setProgState] = useState('');
  const [image, setImage] = useState([]);
  axios.defaults.withCredentials = true;
  const imgUrl = `${url}/progress/getImg`;
  const progUrl = `${url}/progress/getProgress`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(imgUrl);
        if (res.status) {
          console.log('image data: ', res.data);
          setProgState(res.data.progressState);
          setImage(res.data);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
    const fetchProgData = async () => {
      try {
        const res = await axios(progUrl);
        if (res.status) {
          console.log('progress data: ', res.data);
          setProgState(res.data.progressState);
          updateProgressBar(res.data.progressState);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProgData();
  }, []);

  const updateProgressBar = (state) => {
    switch (state) {
      case 'started':
        setPercentage(10);
        break;
      case 'almost':
        setPercentage(70);
        break;
      case 'finished':
        setPercentage(100);
        break;
      default:
        setPercentage(0);
        break;
    }
  };

  return (
    <div className="progress-tracking">
      <h2>Progress Tracking</h2>
      <div className="progress-container">
        <div className="progress-bar">
          <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </div>
        <p className="progress-state">
          Progress state:{' '}
          <span className="progress-value">{progStateValue}</span>
        </p>
        <div className="image-container">
          {image &&
            image.map((img) => (
              <div className="photo-card" key={img.id}>
                {img.images.length > 0 ? (
                  img.images.map((im) => (
                    <div key={im._id} className="image-download">
                      <img src={im} alt="Uploaded work" />
                      <a
                        href={im}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="view-button"
                        title="Click to view image in full size"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </a>
                    </div>
                  ))
                ) : (
                  <span>Nothing to Display of images</span>
                )}
              </div>
            ))}
        </div>
      </div>

      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Track;
