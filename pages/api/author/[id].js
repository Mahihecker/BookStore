import path from "path";
import fs from "fs";

export default function handler(req, res) {
    const { id } = req.query;
    const filePath = path.join(process.cwd(), "books.json");

    try {
        const data = fs.readFileSync(filePath, "utf8");
        const parsedData = JSON.parse(data);
        const author = parsedData.authors.find((author) => author.id === id);
        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }
        return res.status(200).json({ author });
    } catch (error) {
        console.error("Error reading author data:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
