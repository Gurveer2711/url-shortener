import { Timestamp } from "bson";
import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    trim: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  visitCount: {
    type: Number,
    default: 0,
    },
  visits: [
    {
      ipAddress: {
        type: String,
        required: true,
          },
          userAgent: {
            type: String,
            required: true,
          },
          timestamp: {
            type: Date,
            default: Date.now,
          },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
const Url = mongoose.model("Url", urlSchema);

export default Url;      
