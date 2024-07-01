import mongoose from "mongoose";
import CONFIG from "../config/environment";

mongoose
  .connect(`${CONFIG.db}`)
  .then(() => {
    console.log("Mongodb connected successfully");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
