import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Ensure this matches the books' `genreId`
  name: { type: String, required: true },
});

export default mongoose.models.Genre || mongoose.model('Genre', genreSchema);
