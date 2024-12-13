import connectToDatabase from '../../../lib/db';
import User from '../../../models/User';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, username, password } = req.body;

    try {
      console.log('Connecting to the database...');
      await connectToDatabase();
      console.log('Connected to the database.');

      // Validate input
      if (!email || !username || !password) {
        return res.status(400).json({ message: 'All fields are required!' });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('User already exists:', email);
        return res.status(409).json({ message: 'User already exists!' });
      }

      console.log('Hashing password...');
      const hashedPassword = await bcrypt.hash(password, 10);

      console.log('Creating a new user...');
      const newUser = new User({
        email,
        username,
        password: hashedPassword,
        createdAt: new Date(),
        searchHistory: [],
      });

      console.log('Saving user to database...');
      await newUser.save();
      console.log('User saved successfully:', newUser);

      res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
      console.error('Signup Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
