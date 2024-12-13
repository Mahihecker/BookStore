import connectToDatabase from '../../lib/db';
import Book from '../../models/Book';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      // Fetch all books
      const books = await Book.find({});

      // Filter featured books
      const featuredBooks = books.filter((book) => book.featured === true);

      res.status(200).json({ featuredBooks });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch books', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
