import mongoose from "mongoose";
import config from "../config/config.js";

function connectDB() {
  return mongoose.connect(config.DATABASE_URL);  
}

export default connectDB;
