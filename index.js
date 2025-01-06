const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const urlRoutes = require("./routes/url");

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(express.json());
app.use("/shorten", urlRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
