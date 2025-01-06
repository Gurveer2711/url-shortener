import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import urlRoutes from "./routes/url.js";

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(express.json());
app.use("/", urlRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
