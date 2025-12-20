const mongoose = require("mongoose");

let dbStatus = { connected: false, message: "MongoDB not running" };

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    dbStatus = { connected: true, message: "MongoDB Connected" };
    console.log("✓ MongoDB Connected Successfully");
  } catch (error) {
    dbStatus = { connected: false, message: "Using Local Storage (MongoDB not available)" };
    console.log("⚠ MongoDB not available - Using Local Storage");
  }
};

const getDBStatus = () => dbStatus;

module.exports = { connectDB, getDBStatus };
