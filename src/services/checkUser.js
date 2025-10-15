// import mongoose from "mongoose";
import userModel from "../models/model.user.js";
 async function isUser(email) {
   if(!email) return false;
    const user = await userModel.findOne({email});
    if(user)
    {
          return user;
    }
    else{
      return false;
    }
 }

 export default isUser;
