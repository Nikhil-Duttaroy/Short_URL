import express from "express";
import { connectDB } from "./connection.js";

const app = express();

// Mongo DB Connections
connectDB("mongodb://localhost:27017/short_url")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.error("Database Connection Error", err);
  });

// Middleware Connections
app.use(express.json());

// Routes

// Connection
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App running in port: " + PORT);
});
