import mongoose, { Schema, model } from "mongoose";
import { boolean, string } from "zod";

const userSchema = new Schema({
  userName: { type: String, unique: true },
  password: { type: String },
});

const contentSchema = new Schema({
  title: { type: String },
  link: { type: String },
  type: { type: String },
  description:{type:String},
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, ref: "User" },  
} , 
{timestamps:true});

const ShareSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  isShareLink: { type: Boolean, default: false },
  shareLink: { type: String },
});

const messageSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  request: { type: String , required:true},
  response: { type: String ,  required:true },
  
});

export const userModal = model("User", userSchema);
export const contentModal = model("Content", contentSchema);
export const shareModal = model("Share", ShareSchema);
export const messageModal = model("usersMessages", messageSchema);
