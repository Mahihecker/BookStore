// pages/api/search.js
import connectToDatabase from '../../lib/db';
import Book from '../../models/Book';
import Author from '../../models/Author';
import Genre from '../../models/Genre';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { searchTerm } = req.query;

    if (!searchTerm || searchTerm.trim() === '') {
      return res.status(400).json({ message: 'Search term is required' });
    }

    try {
      // Connect to the database
      await connectToDatabase();

      const regex = new RegExp(searchTerm.trim(), 'i'); // Case-insensitive search

      // Search in the Book, Author, and Genre collections by `title`, `name`, or `name` respectively
      const books = await Book.find({ title: { $regex: regex } }, { id: 1, title: 1 }); // Only fetch `id` and `title`
      const authors = await Author.find({ name: { $regex: regex } }, { id: 1, name: 1 }); // Only fetch `id` and `name`
      const genres = await Genre.find({ name: { $regex: regex } }, { id: 1, name: 1 }); // Only fetch `id` and `name`

      return res.status(200).json({ books, authors, genres });
    } catch (error) {
      console.error('Error during search:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
