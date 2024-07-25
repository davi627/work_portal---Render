import mongoose from "mongoose";

const PostImgSchema = new mongoose.Schema({
    images :[{type:String}]
  });

const PostImgModel= mongoose.model("image",PostImgSchema)
export {PostImgModel as PostImg}