import connectToDatabase from "../../../lib/db";
import Author from "../../../models/Author";
import Book from "../../../models/Book";

export default async function handler(req, res) {
  const { id } = req.query;

  await connectToDatabase();

  if (req.method === "GET") {
    try {
      // Find the author by `id`
      const author = await Author.findOne({ id });
      if (!author) {
        return res.status(404).json({ message: "Author not found" });
      }

      // Find all books by this author
      const booksByAuthor = await Book.find({ authorId: id });

      return res.status(200).json({
        author,
        books: booksByAuthor,
      });
    } catch (error) {
      console.error("Error fetching author details:", error);
      return res.status(500).json({ message: "Failed to fetch author details", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
