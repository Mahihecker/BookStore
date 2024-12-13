import path from "path";
import fs from "fs";

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), "books.json");

    try {
        const data = fs.readFileSync(filePath, "utf8");
        const parsedData = JSON.parse(data);
        if (parsedData && parsedData.books) {
            const bookAuthorIds = parsedData.books.map((book) => ({
                id: book.id,
                authorId: book.authorId
            }));
            return res.status(200).json({ bookAuthorIds });
        } else {
            return res.status(404).json({ message: "Books data not found" });
        }
    } catch (error) {
        console.error("Error reading books data:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
