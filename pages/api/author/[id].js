// pages/api/authors/[id].js
import connectToDatabase from '../../../lib/db';
import Author from '../../../models/Author';
import Book from '../../../models/Book';

export default async function handler(req, res) {
  const { id } = req.query;
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const author = await Author.findById(id);
      if (!author) {
        return res.status(404).json({ message: 'Author not found' });
      }

      const booksByAuthor = await Book.find({ authorId: id });
      res.status(200).json({ ...author.toObject(), books: booksByAuthor });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch author details', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
