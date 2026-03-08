import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  tag:     { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Article || mongoose.model("Article", ArticleSchema);