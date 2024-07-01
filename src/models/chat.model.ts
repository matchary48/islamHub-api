import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    chat_id: {
      type: String,
      unique: true,
    },
    user_id: {
      type: String,
    },
    community_id: {
      type: String,
    },
    chat: {
      type: String,
    },
    name: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true, _id: true }
);

const chatModel = mongoose.model("chats", chatSchema);

export default chatModel;
