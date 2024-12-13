import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch collections from the database
    const fetchData = async () => {
      try {
        const booksRes = await fetch('/api/books');
        const authorsRes = await fetch('/api/authors');
        const genresRes = await fetch('/api/genres');
        
        const booksData = await booksRes.json();
        const authorsData = await authorsRes.json();
        const genresData = await genresRes.json();

        setBooks(booksData);
        setAuthors(authorsData);
        setGenres(genresData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const savedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(savedSearches);
  }, []);

  const handleSearch = (term = searchTerm) => {
    if (!term) return;

    const lowerCaseTerm = term.toLowerCase();

    const foundBook = books.find((book) => book.title.toLowerCase() === lowerCaseTerm);
    const foundAuthor = authors.find((author) => author.name.toLowerCase() === lowerCaseTerm);
    const foundGenre = genres.find((genre) => genre.name.toLowerCase() === lowerCaseTerm);

    saveSearchTerm(term);

    if (foundBook) {
      router.push(`/books/${foundBook.id}`);
    } else if (foundAuthor) {
      router.push(`/Authors/${foundAuthor.id}`);
    } else if (foundGenre) {
      router.push(`/genere/${foundGenre.id}`);
    } else {
      router.push('/404'); 
    }

    setSearchTerm(''); 
    setShowRecentSearches(false); 
  };

  const saveSearchTerm = (term) => {
    const updatedSearches = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
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
      <button onClick={() => handleSearch()} className="p-2 bg-blue-500 text-white rounded ml-2">Search</button>
      
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
