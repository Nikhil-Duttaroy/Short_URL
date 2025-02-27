import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./connectDB.js";
import shortUrl from "./routes/url.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
dotenv.config();

// Mongo DB Connections
connectDB(`${process.env.MONGO_CONNECTION_STRING}`);

// Middleware Connections
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://isyoururlshort.netlify.app",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Routes
app.use("/api", shortUrl);
app.use("/api/auth", authRoutes);

// Connection
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App running in port: " + PORT);
});
