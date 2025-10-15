import mongoose, { Schema } from "mongoose";


const userSessionSchema = new mongoose.Schema({
    user:{type: Schema.Types.ObjectId,ref:User, required:true},
    refreshToken:{type:String,required:true,unique:true}
},{
    timestamps:true
})

const UserSessionModel= mongoose.model('UserSessions',userSessionSchema);
export default  UserSessionModel;