// pages/api/user/history.js
import connectToDatabase from '../../../lib/db';
import User from '../../../models/User';

export default async function handler(req, res) {
  await connectToDatabase(); // Ensure database is connected

  try {
    if (req.method === 'GET') {
      const { userId } = req.query;

      // Validate input
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Return search history
      return res.status(200).json({ history: user.searchHistory });
    }

    if (req.method === 'POST') {
      const { userId, searchTerm } = req.body;

      // Validate input
      if (!userId || !searchTerm) {
        return res.status(400).json({ message: 'User ID and search term are required' });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Add the new search term to the user's search history
      user.searchHistory = [searchTerm, ...user.searchHistory].slice(0, 10); // Keep the last 10 searches
      await user.save();

      return res.status(201).json({ message: 'Search term added to history' });
    }

    // Handle unsupported HTTP methods
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    // Centralized error handling
    console.error('Error in user history API:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
