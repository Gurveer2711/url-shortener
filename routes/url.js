const express = require("express");
const { shortenUrl, redirectUrl } = require("../controllers/urlController");

const router = express.Router();

router.post("/", shortenUrl);

router.get("/:shorturl", getUrl);

router.delete("/:shortUrl", deleteUrl);

router.put("/:shortUrl", updateUrl);

module.exports = router;
