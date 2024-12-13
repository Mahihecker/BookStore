import path from "path";
import fs from "fs";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "books.json");

  try {
    const f=fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(f);
    const genre = data.genres;
    res.status(200).json({ genre });
  } catch (error) {
    console.error("Error reading genres data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
