const mongoose = require("mongoose");
const config = require("./default.json");
const db = config.mongoURI;
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewURLParser: true,
    });
    console.log("Connected to DB");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB;
