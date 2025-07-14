// import mongoose from "mongoose";

// const connectDB = async () => {
//   mongoose.connection.on("connected", () => {
//     console.log("MongoDB connected");
//   });

//   await mongoose.connect(`${process.env.MONGODB_URI}/trendify`);
// };

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Log the connection string for debugging
    console.log("Connecting to MongoDB with URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;

