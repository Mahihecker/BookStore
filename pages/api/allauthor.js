// pages/api/authors/index.js
import connectToDatabase from '../../../lib/db';
import Author from '../../../models/Author';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const authors = await Author.find({});
      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch authors', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
