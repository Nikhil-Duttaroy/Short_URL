import mongoose from "mongoose";
import { nanoid } from "nanoid";

const urlSchema = new mongoose.Schema(
  {
    //TODO:Add Validations for fullUrls
    fullUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(8),
    },
    visitHistory: [{ timestamps: { type: String }, ip: { type: String } }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export const URL = mongoose.model("url", urlSchema);
