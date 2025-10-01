import mongoose from "mongoose";
import config from "../config/config.js";

function connectDb(){
    mongoose.connect(config.DATABASE_URL)
    .then(()=>{
        console.log("Connected to database successfully");
        
    }).catch((err)=>{
        console.log("Error connecting to database",err);
        
    })
}


export default connectDb;