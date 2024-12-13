import connectToDatabase from '../../../lib/db';
import User from '../../../models/User';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const { userId } = req.query;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ history: user.searchHistory });
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching search history', error });
    }
  }

  if (req.method === 'POST') {
    const { userId, searchTerm } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.searchHistory.push(searchTerm);
      await user.save();
      return res.status(201).json({ message: 'Search term added to history' });
    } catch (error) {
      return res.status(500).json({ message: 'Error saving search term', error });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
