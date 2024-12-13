import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  genreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
  rating: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  coverImage: { type: String },
  publishDate: { type: Date }
});

export default mongoose.models.Book || mongoose.model('Book', bookSchema);
