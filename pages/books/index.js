
import { useState } from 'react';
import FeaturedBooks from '../../components/FeaturedBooks';
import DarkModeToggle from '../../components/DarkModeToggle';

export default function BooksListPage({ initialBooks, genres }) {
  const [filteredBooks, setFilteredBooks] = useState(initialBooks);
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleGenreChange = async (e) => {
    const genreId = e.target.value;
    setSelectedGenre(genreId);

    if (!genreId) {
      setFilteredBooks(initialBooks);
      return;
    }

    try {
      const res = await fetch(`/api/genre/${genreId}`);
      const data = await res.json();

      if (data && data.books) {
        setFilteredBooks(data.books);
      } else {
        setFilteredBooks([]);
      }
    } catch (error) {
      console.error("Failed to fetch books by genre:", error);
      setFilteredBooks([]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Books</h1>
      <div className="mb-4">
        <label htmlFor="genre" className="mr-2">Filter by Genre:</label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={handleGenreChange}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <FeaturedBooks books={filteredBooks} />
      <DarkModeToggle />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const resBooks = await fetch('http://localhost:3000/api/allbooks');
    const dataBooks = await resBooks.json();

    const resGenres = await fetch('http://localhost:3000/api/genres');
    const dataGenres = await resGenres.json();

    if (!dataBooks || !dataBooks.books || !dataGenres || !dataGenres.genre) {
      return { notFound: true };
    }

    return {
      props: {
        initialBooks: dataBooks.books,
        genres: dataGenres.genre,
      },
      revalidate: 86400,
    };
  } catch (error) {
    console.error("Failed to fetch books or genres data:", error);
    return { notFound: true };
  }
}
