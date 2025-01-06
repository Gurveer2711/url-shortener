const express = require("express");
const { shortenUrl, redirectUrl, updateUrl, deleteUrl } = require("../controllers/urlController");

const router = express.Router();

router.post("/", shortenUrl);

router.get("/:shorturl", redirectUrl);

router.delete("/:shortUrl", deleteUrl);

router.put("/:shortUrl", updateUrl);

module.exports = router;
