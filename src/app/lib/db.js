import mongoose from "mongoose";

const connectDB= async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
        console.log("✅ Database already connected---1---connection:", mongoose.connection);
      return; // already connected
    }

   const connection= await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DTABASE_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection string:", connection.connection.hostc);

    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw new Error("Database connection failed");
  }
};

export default connectDB;
