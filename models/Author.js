import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  biography: { type: String },
  birthDate: { type: Date },
  deathDate: { type: Date },
});

export default mongoose.models.Author || mongoose.model("Author", authorSchema);
