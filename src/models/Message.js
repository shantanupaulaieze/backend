import mongoose from "mongoose";
const { Schema } = mongoose;

const ChatModels = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    role: String, // 'user' | 'assistant'
    content: String,
  },
  { timestamps: true }
);

export default mongoose.models.Chat || mongoose.model("Chat", ChatModels);
