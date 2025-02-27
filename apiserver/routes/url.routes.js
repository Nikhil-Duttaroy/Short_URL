import express from "express";
import {
  handleShortUrlGeneration,
  handleGetAllUrl,
  handleGetUrl,
} from "../controllers/url.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/url", protect, handleShortUrlGeneration);

router.get("/url", protect, handleGetAllUrl);

router.get("/url/:id", handleGetUrl);

export default router;
