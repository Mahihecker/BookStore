import connectToDatabase from '../../lib/db';
import Book from '../../models/Book';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await connectToDatabase();

    // Fetch books with populated author and genre references
    const books = await Book.find()
      .populate('authorId', 'name') // Populate authorId with the 'name' field
      .populate('genreId', 'name'); // Populate genreId with the 'name' field

    if (books && books.length > 0) {
      return res.status(200).json({ books });
    } else {
      return res.status(404).json({ message: 'No books found in the database' });
    }
  } catch (error) {
    console.error('Error fetching books:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
