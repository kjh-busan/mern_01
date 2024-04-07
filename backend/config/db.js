const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoUri");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {});
    console.info("mongoDb connected: " + db);
  } catch (err) {
    console.error("[ERROR]mongoDb connected: ", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
