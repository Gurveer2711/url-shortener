import express from "express";
import { shortenUrl, redirectUrl, updateUrl, deleteUrl } from "../controllers/url.js";

const router = express.Router();

router.post("/", shortenUrl);

router.get("/:shortUrl", redirectUrl);

router.delete("/:shortUrl", deleteUrl);

router.put("/:shortUrl", updateUrl);

export default router;
