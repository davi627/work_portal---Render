import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './home.css';
import { Link, useNavigate } from 'react-router-dom';
import UploadWidget from '../Upload/UploadWidget';
import { useDispatch } from 'react-redux';
import { setJobsData } from '../../features/Jobs/JobSlice';
import { ClipLoader } from 'react-spinners';
import { url } from '../../utils/apiRequest';

const Ehome = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const dispatch = useDispatch();
  const handleLogout = () => {
    axios
      .get(`${url}/auth/logout`)
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          navigate('/employerlogin');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [people, setPeople] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [environment, setEnvironment] = useState('');
  const [equipment, setEquipment] = useState('');
  const [code, setCode] = useState('');
  const [location, setLocation] = useState('');
  const [days, setDays] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generateCode = () => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const getRandomLetter = () =>
        letters[Math.floor(Math.random() * letters.length)];
      const getRandomNumber = () => Math.floor(Math.random() * 10);
      let num1 = getRandomNumber();
      let num2 = getRandomNumber();
      while (num2 === num1) {
        num2 = getRandomNumber();
      }
      let num3 = getRandomNumber();
      while (num3 === num2) {
        num3 = getRandomNumber();
      }
      let num4 = getRandomNumber();
      while (num4 === num3) {
        num4 = getRandomNumber();
      }
      return `${getRandomLetter()}${getRandomLetter()}${num1}${num2}${num3}${num4}`;
    };

    setCode(generateCode());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${url}/jobs/post`, {
        title,
        price,
        location,
        people,
        description,
        contact,
        environment,
        equipment,
        days,
        code,
        startTime,
        endTime,
        date,
        images,
      });
      if (response.status) {
        await axios.post(`${url}/auth/Notification`, {});
        console.log(response.data);
        alert('The job has been posted');
        dispatch(setJobsData(response.data));
        navigate('/progress');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="button-container">
        <button className="add-work">
          <Link to={'/progress'}>Jobs Applied</Link>
        </button>
        <button onClick={handleLogout} className="logout">
          Logout
        </button>
      </div>

      <div className="work-details">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="column">
              <label className="title">Title</label>
              <textarea
                className="text-area"
                cols="10"
                rows="2"
                value={title}
                placeholder="construction/laundry/gardening"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="column">
              <label className="price">Price</label>
              <textarea
                className="text-area"
                cols="10"
                rows="2"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="column">
              <label className="location">Location</label>
              <textarea
                className="text-area"
                cols="10"
                rows="2"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="column">
              <label className="people">people</label>
              <textarea
                className="text-area"
                cols="10"
                rows="2"
                placeholder="number of people"
                value={people}
                onChange={(e) => {
                  setPeople(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="quill-container">
            <label className="description">Description</label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
            />
          </div>
          <div className="row">
            <div className="column">
              <label className="time">Start Time</label>
              <input
                type="time"
                className="text-area"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
              />
            </div>
            <div className="column">
              <label className="time">End Time</label>
              <input
                type="time"
                className="text-area"
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
              />
            </div>
            <div className="column">
              <label className="disability">code</label>
              <textarea
                className="text-area"
                cols="10"
                rows="2"
                value={code}
                placeholder="start with a letter and 4 numbers that not consecutive"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="column">
              <label className="days">Days</label>
              <textarea
                className="text-area"
                cols="10"
                rows="2"
                value={days}
                onChange={(e) => {
                  setDays(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <label className="equipment">Equipment</label>
              <textarea
                className="text-area"
                cols="10"
                rows="2"
                placeholder="provided or not"
                value={equipment}
                onChange={(e) => {
                  setEquipment(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="column">
              <label className="environment">Environment</label>
              <textarea
                className="text-area"
                cols="10"
                rows="2"
                placeholder="outdoor or indoor"
                value={environment}
                onChange={(e) => {
                  setEnvironment(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="column">
              <label className="contact">Contact</label>
              <textarea
                className="text-area"
                cols="10"
                rows="2"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="column">
              <label className="contact">Date</label>
              <textarea
                className="text-area"
                type="date"
                cols="10"
                rows="2"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <button type="submit" className="post-button" disabled={loading}>
            {loading ? <ClipLoader size={24} color={'#fff'} /> : 'Post'}
          </button>
        </form>
        <div className="button-row">
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
        </div>
        {error && <span>{error}</span>}
      </div>
    </div>
  );
};

export default Ehome;
