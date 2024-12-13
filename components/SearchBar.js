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
  const { user } = useAuth(); // Get the logged-in user from AuthContext
  const router = useRouter();

  // Fetch the logged-in user's search history on component mount or when user changes
  useEffect(() => {
    const fetchSearchHistory = async () => {
      if (!user) return;

      try {
        const historyRes = await fetch(`/api/user/history?userId=${user.id}`);
        if (historyRes.ok) {
          const historyData = await historyRes.json();
          setRecentSearches(historyData.history || []);
        } else {
          console.error('Failed to fetch search history:', historyRes.statusText);
        }
      } catch (error) {
        console.error('Error fetching search history:', error);
      }
    };

    fetchSearchHistory();
  }, [user]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return; // Prevent empty searches

    try {
      // Perform the search query
      const res = await fetch(`/api/search?searchTerm=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();

      setBooks(data.books);
      setAuthors(data.authors);
      setGenres(data.genres);

      // If no results found, alert the user
      if (data.books.length === 0 && data.authors.length === 0 && data.genres.length === 0) {
        alert('No matching results found.');
      } else {
        // Save search term to user's history if logged in
        if (user) {
          try {
            const historyRes = await fetch('/api/user/history', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId: user.id, searchTerm }),
            });

            if (!historyRes.ok) {
              console.error('Failed to save search term:', historyRes.statusText);
            } else {
              const updatedHistory = await historyRes.json();
              setRecentSearches(updatedHistory.history); // Update UI with the new history
            }
          } catch (error) {
            console.error('Error saving search term:', error);
          }
        }
      }
    } catch (error) {
      console.error('Error searching:', error);
    }

    setSearchTerm(''); // Clear the input field
    setShowRecentSearches(false); // Hide the recent searches dropdown
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowRecentSearches(value.length > 0); // Show recent searches if input is not empty
  };

  const handleHistoryClick = (term) => {
    setSearchTerm(term); // Pre-fill the search bar with the history term
    setShowRecentSearches(false); // Hide the recent searches dropdown
    handleSearch(); // Perform the search
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

      {/* Display recent searches dropdown */}
      {showRecentSearches && recentSearches.length > 0 && (
        <ul className="absolute bg-white border rounded w-full mt-1 z-10">
          {recentSearches.map((term, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleHistoryClick(term)}
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

      {/* Display search history below the search bar */}
      <div className="mt-4">
        <h3 className="font-bold">Search History</h3>
        <ul className="bg-white border rounded w-full p-2">
          {recentSearches.map((term, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleHistoryClick(term)}
            >
              {term}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
