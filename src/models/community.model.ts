import mongoose from "mongoose";

const communitySchema = new mongoose.Schema(
  {
    community_id: {
      type: String,
      unique: true,
    },
    user_id: {
      type: String,
    },
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true, _id: true }
);

const communityModel = mongoose.model("communities", communitySchema);

export default communityModel;
