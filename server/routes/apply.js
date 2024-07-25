import express from 'express'
import { Apply } from '../Models/Apply.js'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

router.post('/postapply',async(req,res)=>{
    const {
        name,
        email,
        phone,
        location,
        code,
        experience,
    } = req.body
    console.log(req.body)
    try {
        const newApply = await Apply.create({
            name,
            email,
            phone,
            location,
            code,
            experience,
        })
        console.log(newApply)
       
        res.status(201).json({message:'Apply form submitted'})
        
    } catch (err) {
        res.status(400).json({error:err})
        
    }
})
router.get('/getapplication',async (req,res)=>{
    try {
        const apply= await Apply.find()
        if(!apply){
            return res.status(404).json({message:'No posts found'})
        }
        res.status(200).json(apply)
    } catch (err) {
        res.status(400).json({error:err})
    }
})

router.post('/approve', async (req, res) => {
    const { email } = req.body;
    const token = crypto.randomBytes(16).toString('hex');
  
   
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'davidmbita001@gmail.com', 
        pass: 'jtfq pvyu memx szjh'          
      }
    });
  
    // Send approval email
    
    try {
      const link = `${process.env.CLIENT_URL}/accept/${email}/${token}`;
      await transporter.sendMail({
        from: 'davidmbita001@gmail.com',
        to: email,
        subject: 'Job Application Approval',
        html: `
          <p>Congratulations! You have been selected for the job.</p>
          <p>Click <a href="${link}">here</a> to accept the offer.</p>
        `
      });
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Failed to send email');
    }
  });
  router.post('/accept', async (req, res) => {
    const { email, token } = req.body;

  
    try {
        const apply = await Apply.findOne({ email: email });
        if (!apply) {
            return res.status(404).json({ message: 'Application not found' });
        }

       
        apply.status = 'accepted';
        await apply.save();

        res.status(200).send('Offer accepted successfully');
    } catch (error) {
        console.error('Error accepting the offer:', error);
        res.status(500).send('Failed to accept the offer');
    }
});



export {router as applyRouter}