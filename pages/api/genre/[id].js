import path from "path";
import fs from "fs";

export default function handler(req, res) {
  const { id } = req.query;
  const filePath = path.join(process.cwd(), "books.json");

  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const booksByGenre = data.books.filter((book) => book.genreId === id);
    res.status(200).json({ books: booksByGenre });
  } catch (error) {
    console.error("Error reading books by genre:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
