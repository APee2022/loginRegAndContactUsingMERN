const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URI);
    console.log("connection successful...");
  } catch (error) {
    console.log(`Error in Mongodb ${error}`);
  }
};

module.exports = connectDB;
