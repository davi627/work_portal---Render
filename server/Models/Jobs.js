import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
    lowercase:true
  }, 
  price:{type:Number},
  location:{type:String},
  people:{type:String},
  description:{type:String},
  contact:{type:Number},
  environment:{type:String},
  equipment:{type:String},
  days:{type:String},
  code:{type:String},
  startTime:{type:String},
  endTime:{type:String},
  date:{type:Date},
  images:[{type:String}]
 
  },{timestamps:true});

const Myjobs= mongoose.model("jobs",jobSchema)
export {Myjobs as Jobs}