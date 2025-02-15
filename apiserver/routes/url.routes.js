import express from "express";
import {
  handleShortUrlGeneration,
  handleGetAllUrl,
  handleGetUrl,
} from "../controllers/url.controller.js";

const router = express.Router();

router.post("/url", handleShortUrlGeneration);

router.get("/url", handleGetAllUrl);

router.get("/url/:id", handleGetUrl);

export default router;
