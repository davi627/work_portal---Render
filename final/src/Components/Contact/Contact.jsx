import React from 'react';
import './Contact.css';
import message from '../../assets/message.png';
import mail from '../../assets/mail.png';
import phone from '../../assets/phone.png';
import facebook from '../../assets/facebook.jpg';

const Contact = () => {
  const [result, setResult] = React.useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult('Sending....');
    const formData = new FormData(event.target);

    formData.append('access_key', 'f96237e4-f117-41b1-a51b-b3a3fd532f82');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult('Form Submitted Successfully');
      event.target.reset();
    } else {
      console.log('Error', data);
      setResult(data.message);
    }
  };

  return (
    <div className="contact">
      <div className="contact-col">
        <h3>
          send us a message <img src={message} alt="" />
        </h3>
        <p>
          Feel free to reach to us in case of any complain or concern.Your
          feedback questions and suggestions are important to us as we strive to
          provide exceptional services to you
        </p>
        <ul>
          <li>
            {' '}
            <img src={mail} width="30" height="30" alt="" />
            davidmbita@gmail.com
          </li>
          <li>
            <img src={phone} width="30" height="30" alt="" />
            +254 745404934
          </li>
          <li>
            <img src={facebook} width="30" height="30" alt="" />
            David Mbita
          </li>
        </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            required
          />
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter Your Phone Number"
            required
          />
          <label>Write your message here</label>
          <textarea
            name="message"
            placeholder="Enter Your Message"
            cols="30"
            rows="6"
            required
          ></textarea>
          <button type="submit" className="btn dark-btn">
            send message
          </button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  );
};

export default Contact;
