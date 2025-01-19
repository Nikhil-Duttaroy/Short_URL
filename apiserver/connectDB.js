import mongoose from "mongoose";

// DB Connection
export async function connectDB(url) {
  return mongoose.connect(url);
}
