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
  const { user } = useAuth(); // Access logged-in user
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, authorsRes, genresRes] = await Promise.all([
          fetch('/api/books'),
          fetch('/api/authors'),
          fetch('/api/genres'),
        ]);

        const [booksData, authorsData, genresData] = await Promise.all([
          booksRes.json(),
          authorsRes.json(),
          genresRes.json(),
        ]);

        setBooks(booksData);
        setAuthors(authorsData);
        setGenres(genresData);

        if (user) {
          const historyRes = await fetch(`/api/user/history?userId=${user.id}`);
          if (historyRes.ok) {
            const historyData = await historyRes.json();
            setRecentSearches(historyData.history || []);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]);

  const handleSearch = async (term = searchTerm) => {
    if (!term) return;

    const lowerCaseTerm = term.toLowerCase();

    const foundBook = books.find((book) => book.title.toLowerCase() === lowerCaseTerm);
    const foundAuthor = authors.find((author) => author.name.toLowerCase() === lowerCaseTerm);
    const foundGenre = genres.find((genre) => genre.name.toLowerCase() === lowerCaseTerm);

    if (user) {
      try {
        await fetch('/api/user/history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, searchTerm: term }),
        });
      } catch (error) {
        console.error('Error adding search history:', error);
      }
    }

    if (foundBook) {
      router.push(`/books/${foundBook.id}`);
    } else if (foundAuthor) {
      router.push(`/authors/${foundAuthor.id}`);
    } else if (foundGenre) {
      router.push(`/genres/${foundGenre.id}`);
    } else {
      router.push('/404');
    }

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
    handleSearch(term);
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
        onClick={() => handleSearch()}
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
