require("dotenv").config();
const mongoose = require("mongoose");

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ Successfully connected to MongoDB Atlas");
    process.exit(0);
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
    process.exit(1);
  }
}

testConnection();
