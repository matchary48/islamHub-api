import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    video_id: {
      type: String,
      unique: true,
    },
    user_video_id: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    video: {
      type: String,
    },
    name: {
      type: String,
    },
    user_image: {
      type: String,
    },
  },
  { timestamps: true, _id: true }
);

const videoModel = mongoose.model("videos", videoSchema);

export default videoModel;
