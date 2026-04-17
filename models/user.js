import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,   // 🔥 ADD THIS
  password: String,
});

export default mongoose.model("User", userSchema);