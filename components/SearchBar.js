import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

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
      try {
        const [booksRes, authorsRes, genresRes] = await Promise.all([
          fetch('/api/book'),
          fetch('/api/author'),
          fetch('/api/genre'),
        ]);

        if (!booksRes.ok || !authorsRes.ok || !genresRes.ok) {
          console.error('Error fetching data:', {
            booksStatus: booksRes.status,
            authorsStatus: authorsRes.status,
            genresStatus: genresRes.status,
          });
          return;
        }

        const [booksData, authorsData, genresData] = await Promise.all([
          booksRes.json(),
          authorsRes.json(),
          genresRes.json(),
        ]);

        setBooks(booksData);
        setAuthors(authorsData);
        setGenres(genresData);

        if (user) {
          const historyRes = await fetch(`/api/user/history?userId=${user._id}`);
          if (historyRes.ok) {
            const historyData = await historyRes.json();
            setRecentSearches(historyData.history || []);
          } else {
            console.error('Failed to fetch search history:', historyRes.status);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return; // Prevent empty searches

    const lowerCaseTerm = searchTerm.toLowerCase();

    // Find matches (case insensitive)
    const foundBook = books.find((book) => book.title?.toLowerCase() === lowerCaseTerm);
    const foundAuthor = authors.find((author) => author.name?.toLowerCase() === lowerCaseTerm);
    const foundGenre = genres.find((genre) => genre.name?.toLowerCase() === lowerCaseTerm);

    if (foundBook || foundAuthor || foundGenre) {
      if (user) {
        try {
          const res = await fetch('/api/user/history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user._id, searchTerm }),
          });
          if (!res.ok) {
            console.error('Failed to save search history:', res.status);
          } else {
            setRecentSearches((prev) => [searchTerm, ...prev].slice(0, 10)); // Update local state
          }
        } catch (error) {
          console.error('Error saving search history:', error);
        }
      }

      // Navigate to the appropriate page
      if (foundBook) {
        router.push(`/books/${foundBook._id}`);
      } else if (foundAuthor) {
        router.push(`/Authors/${foundAuthor._id}`);
      } else if (foundGenre) {
        router.push(`/genere/${foundGenre._id}`);
      }
    } else {
      alert('No matching results found.');
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

  const handleRecentSearchClick = (term) => {
    setSearchTerm(term);
    setShowRecentSearches(false);
    handleSearch();
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
              onClick={() => handleRecentSearchClick(term)}
            >
              {term}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
