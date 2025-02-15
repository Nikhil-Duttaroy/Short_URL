import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./connectDB.js";

const app = express();
dotenv.config();

// Mongo DB Connections
connectDB(`${process.env.MONGO_CONNECTION_STRING}`);

// Middleware Connections
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes

// Connection
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App running in port: " + PORT);
});
