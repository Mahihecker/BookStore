import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  biography: { type: String, required: true },
  photo: { type: String },
  birthDate: { type: Date },
  deathDate: { type: Date }
});

export default mongoose.models.Author || mongoose.model('Author', authorSchema);
