import mongoose, { Schema } from "mongoose";
import { type } from "os";

const postScheme = new mongoose.Schema(
  {
    title: {
      type: String, // data type
      required: true, // makes the field mandatory
      unique: true, // no two posts can have the same title
      trim: true, // removes whitespace from start & end
      minlength: 5, // minimum length of title
      maxlength: 100,
    },

    content: {
      type: String,
      required: true,
    },
    photo: {
      type: String, // will store image URL or file path
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const postModel = new mongoose.model('Post',postScheme);
export default postModel;

