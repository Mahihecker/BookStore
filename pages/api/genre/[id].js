import connectToDatabase from "../../../lib/db";
import Book from "../../../models/Book";

export default async function handler(req, res) {
  const { id } = req.query; // Extract the genre ID from the URL

  await connectToDatabase(); // Establish a connection to MongoDB

  if (req.method === "GET") {
    try {
      console.log("Genre ID received:", id);

      // Match `genreId` with the `id` as a string
      const booksByGenre = await Book.find({ genreId: id }).populate("authorId", "name");

      if (!booksByGenre.length) {
        return res.status(404).json({ message: "No books found for this genre" });
      }

      console.log("Books for genre:", booksByGenre);

      return res.status(200).json({ books: booksByGenre });
    } catch (error) {
      console.error("Error fetching books by genre:", error);
      return res.status(500).json({ message: "Failed to fetch books by genre", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
