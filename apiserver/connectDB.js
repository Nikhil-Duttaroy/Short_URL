import mongoose from "mongoose";

// DB Connection
export async function connectDB(url) {
  try {
    await mongoose.connect(url);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the process with failure
  }
}