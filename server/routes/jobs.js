import express from 'express';
import { Jobs } from '../Models/Jobs.js';
const router = express.Router();
import dotenv from 'dotenv'
dotenv.config()

router.post('/post',async (req,res)=>{
    const {
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
        images
       
    } = req.body;
    try {
        const postJob = await Jobs.create({
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
        images
       
        })
        res.status(201).json(postJob)
    } catch (err) {
        res.status(400).json({error:err})
    }
})

router.get('/allPosts',async (req,res)=>{
    try {
        const postJob = await Jobs.find()
        if(!postJob){
            return res.status(404).json({message:'No posts found'})
        }
        res.status(200).json(postJob)
    } catch (err) {
        res.status(400).json({error:err})
    }
})
router.get('/singleJob/:id',async (req,res)=>{
    const { id }  = req.params;
    console.log(id)
    try {
        const job = await Jobs.findById({_id:id})
        if(!job){
            return res.status(404).json({message:'No posts found'})
        }
        res.status(200).json(job)
    } catch (err) {
        res.status(400).json({error:err})
    }
})
router.get('/construction',async (req,res)=>{
    try {
        const job = await Jobs.find({title:'construction'})
        if(!job){
            return res.status(404).json({message:'No posts found'})
        }
        res.status(200).json(job)
    } catch (err) {
        res.status(400).json({error:err})
    }
})
router.get('/gardening',async (req,res)=>{
    try {
        const job = await Jobs.find({title:'gardening'})
        if(!job){
            return res.status(404).json({message:'No posts found'})
        }
        res.status(200).json(job)
    } catch (err) {
        res.status(400).json({error:err})
    }
})
router.get('/laundry',async (req,res)=>{
    try {
        const job = await Jobs.find({title:'laundry'})
        if(!job){
            return res.status(404).json({message:'No posts found'})
        }
        res.status(200).json(job)
    } catch (err) {
        res.status(400).json({error:err})
    }
})
export { router as jobsRouter };