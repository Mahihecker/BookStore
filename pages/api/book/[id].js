import path from "path"
import fs from "fs"
export default function handler(req, res) {
    const { id } = req.query;
    const p = path.join(process.cwd(),"books.json")
    const data = fs.readFileSync(p)
    const arr = JSON.parse(data)
    const book = arr.books.find((book) => book.id === id);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
    return res.status(200).json({ book });
}