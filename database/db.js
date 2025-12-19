import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongodb is connected successfully");
  } catch (error) {
    console.error("Mongodb connection failded", error);
    process.exit(1);
  }
};

export default connectToDB;
