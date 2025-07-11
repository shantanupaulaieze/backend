import mongoose from "mongoose";
const { Schema } = mongoose;

const UserModels = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
});

export default mongoose.models.User || mongoose.model("User", UserModels);
