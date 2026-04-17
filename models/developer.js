import mongoose from "mongoose";

const developerSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  score: Number,
  followers: Number,
  repos: Number,
  field: String,
});

export default mongoose.model("Developer", developerSchema);