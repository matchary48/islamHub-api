import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comment_id: {
      type: String,
      unique: true,
    },
    user_id: {
      type: String,
    },
    video_id: {
      type: String,
    },
    comment: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true, _id: true }
);

const commentModel = mongoose.model("comments", commentSchema);

export default commentModel;
