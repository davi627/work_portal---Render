import express from 'express';
import bcrypt from 'bcrypt';
import { user } from '../Models/User.js';
import jwt from 'jsonwebtoken'
const router = express.Router();
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

 
  const existingUser = await user.findOne({ username }); 
  if (existingUser) {
    return res.json({ message: "User already exists" });
  }

 
  const hashedPassword = await bcrypt.hash(password, 10);

  
  const newUser = new user({
    username,
    password: hashedPassword, 
  });

 
  await newUser.save();

  return res.json({ message: "User created" });
});

router.post('/login', async (req, res) => { 
  const { username, password } = req.body;
  
 
  const existingUser = await user.findOne({ username });

  if (!existingUser) {
    return res.json({ message: "User does not exist" });
  }

 
  const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.json({ message: "Invalid credentials" });
  }
  const token=jwt.sign({username:user.username},process.env.KEY,{expiresIn:'1h'})
  existingUser.password = undefined;

  return res.status(200).cookie('token',token,{httpOnly:true,maxAge:360000}).json({ status:true,message: "Logged in" ,existingUser});
});
router.post('/forgotpassword',async(req,res)=>{
  const {username}=req.body;
  try{
    const loggedInUser= await user.findOne({username})
    if(!loggedInUser){
      return res.status(404).json({message:"User not found"})
    }

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'davidmbita001@gmail.com',
        pass: 'jtfq pvyu memx szjh'
      }
    });
    const token =jwt.sign({id:loggedInUser._id},process.env.KEY,{expiresIn:'5m'})
    
    var mailOptions = {
      from: 'davidmbita001@gmail.com',
      to: username,
      subject: 'Reset password',
      text:`${process.env.CLIENT_URL}/resetpassword/${token}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
      return res.status(200).cookie('token',token,{httpOnly:true,maxAge:360000}).json({ status:true,message: "Email sent" });
    });
  } catch (err){
    console.log(err)
  }
})
router.post('/resetpassword/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  
  try {
    // Verify the token and decode the user ID
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    
    //hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    
    const updatedUser = await user.findByIdAndUpdate(id, { password: hashedPassword });
    console.log(updatedUser);
    return res.json({ status: true, message: "Password updated successfully" });
  } catch (err) {
    return res.status(400).json({ status: false, message: 'Invalid or expired token' });
  }

})

router.get('/Logout',(req,res)=>{
  res.clearCookie('token')
  return res.json({status:true,message:"logged out"})

})
router.post('/Notification', async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'davidmbita001@gmail.com',
        pass: 'jtfq pvyu memx szjh'
      }
    });

    // Fetch all usernames from database
    const users = await user.find({}, { username: 1 });

    // Prepare email sending for each user
    const promises = users.map(async (user) => {
      await transporter.sendMail({
        from: 'davidmbita001@gmail.com',
        to: user.username, // Send to each username
        subject: 'work seeker jobs',
        html: `
          <p>The Job has been posted. Log in and apply.</p>
        `
      });
    });

    // Wait for all emails to be sent
    await Promise.all(promises);

    res.status(200).json('Emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Failed to send emails', error });
  }
});

export { router as UserRouter };
