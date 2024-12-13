const mongoose = require('mongoose');

const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected to the database.');
    return;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    return connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
