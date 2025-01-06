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
    res.status(200).json(url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error occurred" });
  }
}


async function getUrl(req, res) {
    const { shortUrl } = req.params;
    try {
      const url = await Url.findOne({ shortUrl });
      if (!url) {
        return res.status(404).json({ error: "ShortUrl not found" });
      }
      const originalUrl = url.originalUrl;
      res.status(200).json({ originalUrl });
    } catch {
      console.error(error);
      res.status(500).json({ error: "Server error occurred" });
    }
}

async function redirectUrl(req, res) {

}

async function deleteUrl(req, res) {
    
}


