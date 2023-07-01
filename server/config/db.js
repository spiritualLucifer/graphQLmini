const mongoose = require("mongoose");

const ConnectDB = async () => {
     console.log(process.env.MONGO_URL);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB:", error.message);
  }
};

module.exports = ConnectDB;
