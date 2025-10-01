import dotenv from "dotenv";

dotenv.config();

  const config ={
        DATABASE_URL: process.env.DATABASE_URL,
        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  }




export default config