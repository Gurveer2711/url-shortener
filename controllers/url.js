import Url from "../models/url.js";
import { nanoid } from "nanoid";


async function shortenUrl(req, res) {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "originalUrl is required" });
  }
  try {
    const shortUrl = nanoid(6);
    const url = new Url({ originalUrl, shortUrl });
    await url.save();
    return res.status(201).json(url);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error occurred" });
  }
}

async function redirectUrl(req, res) {
    const { shortUrl } = req.params;
    try {
      const url = await Url.findOne({ shortUrl });
      if (!url) {
        return res.status(404).json({ error: "ShortUrl not found" });
      }
        const originalUrl = url.originalUrl;
        url.visitCount += 1;
        url.visits.push({
          ipAddress: req.ip,
            userAgent: req.headers["user-agent"],
            timestamp: Date.now(),
        });
        await url.save();
      return res.redirect(originalUrl);
    } catch {
      console.error(error);
      return res.status(500).json({ error: "Server error occurred" });
    }
}

async function updateUrl(req, res) {
    const { shortUrl } = req.params;
    try {
        const url = await Url.findOne({ shortUrl });
        if (!url) {
            return res.status(404).json({ error: "ShortUrl not found"});
        }
        const newUrl = nanoid(6);
        url.shortUrl = newUrl;
        url.updatedAt = Date.now();
        await url.save();
        return res.status(200).json(url);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error occurred" });
    } 
}

async function deleteUrl(req, res) {
    const { shortUrl } = req.params;
    try {
        const deleteUrl= await Url.findOneAndDelete({ shortUrl });
        if (!deleteUrl) {
          return res.status(404).json({ error: "ShortUrl not found" });
        }
        
        return res.status(204).json({message: "Url deleted successfully"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error occurred" });
    }
}

export { shortenUrl, redirectUrl, updateUrl, deleteUrl };
