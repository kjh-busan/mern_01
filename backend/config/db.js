const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env.local" });

const { MONGODB_URI } = process.env; // .env 파일에서 MongoDB URI 가져오기

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {});
    console.info("mongoDb connected: " + MONGODB_URI);
  } catch (err) {
    console.error("[ERROR]mongoDb connected: ", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
