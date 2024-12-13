import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  searchHistory: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', function (next) {
  console.log('Preparing to save user:', this);
  next();
});

export default mongoose.models.User || mongoose.model('User', userSchema);
