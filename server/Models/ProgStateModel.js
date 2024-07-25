import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
    progressState: { type: String, required: true,lowercase:true},
    image :[{type:String}]
  });

const progressModel= mongoose.model("progress",progressSchema)
export {progressModel as Progress}