import DarkModeToggle from '../components/DarkModeToggle';
import FeaturedBooks from '../components/FeaturedBooks';

export default function HomePage({ books }) {
  return (
    <div className="container mx-auto p-4">
      <FeaturedBooks books={books} />
      <DarkModeToggle />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('http://localhost:3000//api/books'); // Replace with your actual API endpoint
    const data = await res.json();
    if (!data || !data.featuredBooks) {
      return { notFound: true };
    }
    return {
      props: {
        books: data.featuredBooks,
      },
      revalidate: 86400, //every 24hr
    };
  } catch (error) {
    console.error("Failed to fetch book data:", error);
    return { notFound: true };
  }
}