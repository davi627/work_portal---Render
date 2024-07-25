import express from 'express';
import bcrypt from 'bcrypt';
import { user2 } from '../Models/User2.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router();

router.post('/eregister', async (req, res) => {
  const { username, password } = req.body;


  try {
    const existingUser = await user2.findOne({ username });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user2({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return res.json({ message: "User created", newUser });
  } catch (error) {
    console.error("Error in /eregister:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/employerlogin', async (req, res) => {

  const { username, password } = req.body;

  try {
    const existingUser = await user2.findOne({ username });
    if (!existingUser) {1
      return res.status(400).json({ error: "Invalid credentials1" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials2" });
    }

    const token = jwt.sign({ username: existingUser.username }, process.env.KEY, { expiresIn: '1h' });

    existingUser.password = undefined;
    return res.status(200).cookie('token', token, { httpOnly: true, maxAge: 3600000 }).json({ status: true, message: "Logged in", existingUser });
  } catch (error) {
    console.error("Error in /employerlogin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/eforgotpassword', async (req, res) => {
  const { username } = req.body;
  try {
    const loggedInUser = await user2.findOne({ username });
    if (!loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'davidmbita001@gmail.com',
        pass: 'jtfq pvyu memx szjh'
      }
    });
    const token = jwt.sign({ id: loggedInUser._id }, process.env.KEY, { expiresIn: '5m' });

    const mailOptions = {
      from: 'davidmbita001@gmail.com',
      to: username,
      subject: 'Reset password',
      text: `${process.env.CLIENT_URL}/eresetpassword/${token}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to send email" });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).cookie('token', token, { httpOnly: true, maxAge: 360000 }).json({ status: true, message: "Email sent" });
      }
    });
  } catch (err) {
    console.log("Error in /eforgotpassword:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/eresetpassword/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await user2.findByIdAndUpdate(id, { password: hashedPassword });
    console.log(updatedUser);
    return res.json({ status: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("Error in /eresetpassword:", err);
    return res.status(400).json({ status: false, message: 'Invalid or expired token' });
  }
});

router.get('/Logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ status: true, message: "logged out" });
});

router.post('/feedback', async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).send('username is required');
  }
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'davidmbita001@gmail.com',
      pass: 'jtfq pvyu memx szjh'
    }
  });

  try {
    await transporter.sendMail({
      from: 'davidmbita001@gmail.com',
      to: username,
      subject: 'Job Application Feedback',
      html: `<p>The job approval has been accepted</p>`
    });
    res.status(200).json('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error });
  }
});

export { router as UserRouter2 };
