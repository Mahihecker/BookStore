import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [searchHistory, setSearchHistory] = useState([]);

  // Fetch search history from the API
  useEffect(() => {
    const fetchSearchHistory = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/users/history?userId=${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setSearchHistory(data.history || []);
          } else {
            console.error('Failed to fetch search history');
          }
        } catch (error) {
          console.error('Error fetching search history:', error);
        }
      }
    };

    fetchSearchHistory();
  }, [user]);

  const handleSearchHistoryClick = (searchTerm) => {
    // Redirect to search results or perform a search based on history item
    console.log('Re-initiating search for:', searchTerm);
    // Example: Redirect logic can be added here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.email}</h1>
      <button
        onClick={logout}
        className="p-2 bg-red-500 text-white rounded mb-6"
      >
        Logout
      </button>

      <h2 className="text-xl font-semibold mb-4">Your Search History:</h2>
      {searchHistory.length > 0 ? (
        <ul className="list-disc list-inside">
          {searchHistory.map((term, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSearchHistoryClick(term)}
            >
              {term}
            </li>
          ))}
        </ul>
      ) : (
        <p>No search history found.</p>
      )}
    </div>
  );
};

export default Dashboard;
