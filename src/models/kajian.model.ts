import mongoose from "mongoose";

const kajianSchema = new mongoose.Schema(
  {
    kajian_id: {
      type: String,
      unique: true,
    },
    user_kajian_id: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    lokasi: {
      type: String,
    },
  },
  { timestamps: true, _id: true }
);

const kajianModel = mongoose.model("kajian", kajianSchema);

export default kajianModel;
