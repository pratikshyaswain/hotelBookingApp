const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("success");
  } catch (error) {
    console.log("Failed");
    process.exit(0);
  }
};
module.exports = connectDb;

// rBjAVa3rqIm8qv2V
