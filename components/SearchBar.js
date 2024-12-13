import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return; // Only fetch recent searches if user is logged in

      try {
        const historyRes = await fetch(`/api/user/history?userId=${user._id}`);
        if (historyRes.ok) {
          const historyData = await historyRes.json();
          setRecentSearches(historyData.history || []);
        } else {
          console.error('Failed to fetch search history:', historyRes.status);
        }
      } catch (error) {
        console.error('Error fetching search history:', error);
      }
    };

    fetchData();
  }, [user]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return; // Prevent empty searches

    try {
      const res = await fetch(`/api/search?searchTerm=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();

      setBooks(data.books);
      setAuthors(data.authors);
      setGenres(data.genres);

      if (data.books.length === 0 && data.authors.length === 0 && data.genres.length === 0) {
        alert('No matching results found.');
      }
    } catch (error) {
      console.error('Error searching:', error);
    }

    // Clear search term and hide recent searches
    setSearchTerm('');
    setShowRecentSearches(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowRecentSearches(value.length > 0);
  };

  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Search for books, authors, or genres..."
        value={searchTerm}
        onChange={handleInputChange}
        className="border p-2 rounded w-full"
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-500 text-white rounded ml-2"
      >
        Search
      </button>

      {showRecentSearches && recentSearches.length > 0 && (
        <ul className="absolute bg-white border rounded w-full mt-1 z-10">
          {recentSearches.map((term, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => setSearchTerm(term)}
            >
              {term}
            </li>
          ))}
        </ul>
      )}

      {/* Display search results */}
      {books.length > 0 || authors.length > 0 || genres.length > 0 ? (
        <div className="mt-4">
          <h3 className="font-bold">Books</h3>
          <ul>
            {books.map((book) => (
              <li key={book.id}>
                <Link href={`/books/${book.id}`}>{book.title}</Link>
              </li>
            ))}
          </ul>

          <h3 className="font-bold">Authors</h3>
          <ul>
            {authors.map((author) => (
              <li key={author.id}>
                <Link href={`/Authors/${author.id}`}>{author.name}</Link>
              </li>
            ))}
          </ul>

          <h3 className="font-bold">Genres</h3>
          <ul>
            {genres.map((genre) => (
              <li key={genre.id}>
                <Link href={`/genere/${genre.id}`}>{genre.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
