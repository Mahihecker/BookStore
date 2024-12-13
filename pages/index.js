import DarkModeToggle from '../components/DarkModeToggle';
import FeaturedBooks from '../components/FeaturedBooks';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

export default function HomePage({ books }) {
  const { user } = useAuth();

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Book Store</h1>
        {user && <p className="text-lg mb-4">You are logged in as: {user.email}</p>}
        <FeaturedBooks books={books} />
        <DarkModeToggle />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('http://localhost:3000/api/books'); // Replace with your actual API endpoint
    const data = await res.json();

    if (!data || !data.featuredBooks) {
      return { notFound: true };
    }

    return {
      props: {
        books: data.featuredBooks,
      },
      revalidate: 86400, // Every 24 hours
    };
  } catch (error) {
    console.error('Failed to fetch book data:', error);
    return { notFound: true };
  }
}
