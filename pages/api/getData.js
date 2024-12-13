import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'books.json');
  
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const books = data.books || [];
    const authors = data.authors || [];
    const genres = data.genres || [];
    
    res.status(200).json({ books, authors, genres });
  } catch (error) {
    console.error('Error reading books.json:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
