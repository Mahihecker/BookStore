import path from "path"
import fs from "fs"
export default function handler(req, res) {
    const p = path.join(process.cwd(),"books.json")
    const data = fs.readFileSync(p)
    const arr = JSON.parse(data)
    const featuredBooks =arr.books.filter(book => book.featured === true);
    return res.status(200).json({ featuredBooks })
}
