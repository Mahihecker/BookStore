import DarkModeToggle from '../../../components/DarkModeToggle';
import BookDetails from '../../../components/BookDetails';
import { useRouter } from 'next/router';
import ProtectedRoute from '../../../components/ProtectedRoute';
export default function BookPage({ book}) {
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
      return { notFound: true }; // Handle case where book is not found
    }

    return {
      props: {
        book: bookData.book,
      },
      revalidate: 86400, // Revalidate every 24 hours
    };
  } catch (error) {
    console.error('Error fetching book details:', error);
    return { notFound: true }; // Return a 404 for errors
  }
}


export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/allbooks');
  const data = await res.json();

  // Use "id" field instead of "_id"
  const books = data.books || [];
  const paths = books.map((book) => ({
    params: { id: book.id.toString() }, // Use "id" from your dataset
  }));

  return {
    paths,
    fallback: true, // Enable fallback for ISR
  };
}


