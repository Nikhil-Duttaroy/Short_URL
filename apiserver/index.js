import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { connectDB } from "./connectDB.js";
import shortUrl from "./routes/url.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
dotenv.config();

// Mongo DB Connections
connectDB(`${process.env.MONGO_CONNECTION_STRING}`);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP, please try again after 15 minutes",
  skip: (req) => req.path === "/url/:id",
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message:
        "Too many requests from this IP, please try again after 15 minutes",
    });
  },
});

// Middleware Connections
const allowedOrigins = [
  "https://isyoururlshort.netlify.app",
  "http://localhost:3000",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api", shortUrl);
app.use("/api/auth", authRoutes);

// Connection
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App running in port: " + PORT);
});
