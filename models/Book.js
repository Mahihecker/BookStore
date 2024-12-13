import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authorId: { type: String, required: true }, // Matches `id` in authors collection
  description: { type: String },
  price: { type: Number },
  genreId: { type: String },
  rating: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  publishDate: { type: Date },
});

export default mongoose.models.Book || mongoose.model("Book", bookSchema);
