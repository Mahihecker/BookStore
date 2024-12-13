import connectToDatabase from "../../lib/db";
import Genre from "../../models/Genre";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const genres = await Genre.find({});
      console.log("Fetched Genres:", genres);
      res.status(200).json({ genre: genres });
    } catch (error) {
      console.error("Error fetching genres:", error);
      res.status(500).json({ message: "Failed to fetch genres", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
