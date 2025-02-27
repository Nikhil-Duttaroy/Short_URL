import { URL } from "../models/url.model.js";

export const handleShortUrlGeneration = async (req, res) => {
  try {
    const { fullUrl } = req.body;
    if (!fullUrl) {
      return res.status(400).send({ message: "Full URL is required" });
    }

    const userUrls = await URL.find({ userId: req.user._id });
    if (userUrls.length >= 5 && !req.user) {
      return res
        .status(403)
        .send({ message: "Login required to create more than 5 URLs" });
    }

    const shortUrl = await URL.create({ fullUrl, userId: req.user._id });
    res.status(201).send({ success: true, shortUrl });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error in URL Creation", error: err.message });
  }
};

export const handleGetAllUrl = async (req, res) => {
  try {
    const shortUrls = await URL.find({ userId: req.user._id });
    if (shortUrls.length <= 0) {
      return res
        .status(200)
        .send({ success: true, message: "No URLs Found", shortUrls: [] });
    }
    res.status(200).send({ success: true, shortUrls });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error in Fetching URLs", error: err.message });
  }
};

export const handleGetUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await URL.findOneAndUpdate(
      { shortUrl: id },
      {
        $push: {
          visitHistory: { timestamps: new Date().toString(), ip: req.ip },
        },
      },
      { new: true }
    );

    if (!entry) {
      return res.status(200).send({ success: true, message: "URL Not Found" });
    }

    res.redirect(entry.fullUrl);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error in Fetching URL", error: err.message });
  }
};