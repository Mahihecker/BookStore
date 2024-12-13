import Link from 'next/link';

export default function BookCard({ book }) {
    return (
        <div className="border p-4 rounded mb-4">
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p className="text-gray-700">Author: {book.author}</p>
            <Link href={`/books/${book.id}`}>
                <a className="text-blue-500 mt-2 inline-block">Read More</a>
            </Link>
        </div>
    );
}
