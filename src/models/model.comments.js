import mongoose, { Schema } from "mongoose";

 const commentSchema = new mongoose.Schema({
    post:{type:Schema.Types.ObjectId,ref:Post, required:true},
    user:{type:Schema.Types.ObjectId,ref:User,required:true},
    text: { type: String, required: true }
 },{
    timestamps:true
 })

 const commentsModel= new mongoose.model("Comment",commentSchema);
 export default commentsModel;