const Url = require("../models/url");
const { nanoid } = require("nanoid");

async function shortenUrl(req, res) {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "originalUrl is required" });
  }
  try {
    const shortUrl = nanoid(6);
    const url = new Url({ originalUrl, shortUrl });
    await url.save();
    res.status(201).json(url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error occurred" });
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
      res.status(200).redirect({ originalUrl });
    } catch {
      console.error(error);
      res.status(500).json({ error: "Server error occurred" });
    }
}

async function updateUrl(req, res) {
    const { shortUrl } = req.params;
    const { newUrl } = req.body;
    try {
        const url = await Url.findOne({ shortUrl });
        if (!url) {
            return res.status(404).json({ error: "ShortUrl not found" });
        }
        url.shortUrl = newUrl;
        url.updatedAt = Date.now();
        await url.save();
        res.status(200).json(url);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error occurred" });
    } 
}

async function deleteUrl(req, res) {
    const { shortUrl } = req.params;
    try {
        const url = await Url.findOne({ shortUrl });
        if (!url) {
            return res.status(404).json({ error: "ShortUrl not found" });
        }
        await url.remove();
        res.status(204).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error occurred" });
    }
}

module.exports = { shortenUrl, redirectUrl, updateUrl, deleteUrl };
