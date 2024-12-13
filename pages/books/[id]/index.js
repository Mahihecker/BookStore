import DarkModeToggle from '../../../components/DarkModeToggle';
import BookDetails from '../../../components/BookDetails';
import { useRouter } from 'next/router';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function BookPage({ book }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <BookDetails book={book} />
        <DarkModeToggle />
      </div>
    </ProtectedRoute>
  );
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`http://localhost:3000/api/book/${params.id}`);
    const bookData = await res.json();

    if (!bookData || !bookData.book) {
      return { notFound: true };
    }

    return {
      props: {
        book: bookData.book,
      },
      revalidate: 86400,
    };
  } catch (error) {
    console.error('Error fetching book details:', error);
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  try {
    const res = await fetch('http://localhost:3000/api/allbooks');
    const data = await res.json();

    // Ensure `data` is an array before using `.map`
    const books = Array.isArray(data) ? data : data.books || [];

    const paths = books.map((book) => ({
      params: { id: book.id.toString() },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error('Error fetching paths:', error);
    return {
      paths: [],
      fallback: true, // Fallback mode for errors
    };
  }
}
