// pages/api/user/history.js
import connectToDatabase from '../../../lib/db';
import User from '../../../models/User';

export default async function handler(req, res) {
  await connectToDatabase();

  try {
    if (req.method === 'POST') {
      const { userId, searchTerm } = req.body;

      if (!userId || !searchTerm) {
        return res.status(400).json({ message: 'User ID and search term are required' });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (!user.searchHistory) {
        user.searchHistory = [];
      }

      if (!user.searchHistory.includes(searchTerm)) {
        user.searchHistory = [searchTerm, ...user.searchHistory].slice(0, 10);
      }

      await user.save();

      return res.status(201).json({ message: 'Search term added to history', history: user.searchHistory });
    }

    if (req.method === 'GET') {
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ history: user.searchHistory || [] });
    }

    if (req.method === 'DELETE') {
      const { userId, searchTerm } = req.body;

      if (!userId || !searchTerm) {
        return res.status(400).json({ message: 'User ID and search term are required' });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.searchHistory = user.searchHistory.filter((term) => term !== searchTerm);

      await user.save();

      return res.status(200).json({ message: 'Search term removed from history', history: user.searchHistory });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error in user history API:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
