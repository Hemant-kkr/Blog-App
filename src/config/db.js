import mongoose from "mongoose";  

async function connectDB() {
  const uri = process.env.NODE_ENV==='development'? process.env.MONGO_URI_ATLAS : process.env.MONGO_URI;
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected For BLog APP');

  } catch (error) {
    console.log('ERROR',error);
    process.exit(1);
  }
}

export default connectDB;