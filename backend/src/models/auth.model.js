import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String, 
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  busNumber: { type: String, unique: true, sparse: true }, // only for drivers
  adminNumber: String,
  email: { type: String, unique: true, sparse: true },      // only for admins
  role: { type: String, enum: ["commuter", "driver", "admin"], required: true }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
