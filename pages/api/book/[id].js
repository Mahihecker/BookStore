import connectToDatabase from '../../../lib/db';
import Book from '../../../models/Book';

export default async function handler(req, res) {
  const { id } = req.query; // Extract the book ID from the URL

  await connectToDatabase(); // Establish a connection to MongoDB

  if (req.method === 'GET') {
    try {
      // Find the book by the "id" field in the MongoDB collection
      const book = await Book.findOne({ id }) // Use "id" instead of "_id"
        .populate('authorId', 'name') // Populate the author field with its name
        .populate('genreId', 'name'); // Populate the genre field with its name

      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      return res.status(200).json({ book });
    } catch (error) {
      console.error('Error fetching book details:', error);
      return res.status(500).json({ message: 'Failed to fetch book details', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
