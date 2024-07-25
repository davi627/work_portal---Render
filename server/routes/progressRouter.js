import express from 'express'
import {Progress} from '../Models/ProgStateModel.js'
import { PostImg } from '../Models/PostImg.js'
const router = express.Router()
import dotenv from 'dotenv'
dotenv.config()

router.post('/',async(req,res)=>{
    const { progressState,image } = req.body
    try {
       const progState = await Progress.create({progressState,image });
       if(!progState){
        return res.status(400).json('error creating progState')
       }
       res.status(200).json(progState)
    } catch (err) {
        res.status(400).json({error:err.message})
    }
})

//post  the image  after finishig
router.post('/postImg',async(req,res)=>{
  const { images } = req.body;
    try {
       const progImg = await PostImg.create({images });
       if(!progImg){
        return res.status(400).json('error creating progState')
       }
       res.status(200).json(progImg)
    } catch (err) {
        res.status(400).json({error:err.message})
    }
})
//get the image posted after finishig
router.get('/getImg',async(req,res)=>{
    try {
       const progImg = await PostImg.find({ });
       if(!progImg){
        return res.status(400).json('error creating progState')
       }
       res.status(200).json(progImg)
    } catch (err) {
        res.status(400).json({error:err.message})
    }
})

//get progress state
router.get('/getProgress',async(req,res)=>{
    try {
       const progState = await Progress.findOne();
       if(!progState){
        return res.status(400).json('error creating progState')
       }
       res.status(200).json(progState)
    } catch (err) {
        res.status(400).json({error:err.message})
    }
})

//update the progress state
router.put('/updateProgress', async (req, res) => {
    const { progressState } = req.body;
  
    try {
      const updatedProgState = await Progress.findOneAndUpdate(
        { progressState: { $in: ["started", "almost","finished"] } },
        { $set: { progressState } },
        { new: true }
      );
  
      if (!updatedProgState) {
        return res.status(404).json('No documents with "Started" or "Almost" progress found');
      }
  
      res.status(200).json(updatedProgState);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message }); // Specific validation error message
      } else {
        // Handle other errors (e.g., database connection issues)
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
  });
  router.delete('/deleteImg/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedImg = await PostImg.findByIdAndDelete(images.id);
  
      if (!deletedImg) {
        return res.status(404).json('Image not found');
      }
  
      res.status(200).json({ message: 'Image deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  



export {router as progressRouter}