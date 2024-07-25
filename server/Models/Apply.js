import mongoose from "mongoose";

const ApplyShema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    email:{type:String},
    phone:{type:Number},
    location:{type:String},
    code:{type:String},
    experience:{type:String}
},{timestamps:true})

const ApplyModel= mongoose.model("apply",ApplyShema)

export {ApplyModel as Apply}