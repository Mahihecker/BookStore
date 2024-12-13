import DarkModeToggle from '../../../components/DarkModeToggle';
import BookDetails from '../../../components/BookDetails';
import { useRouter } from 'next/router';

export default function BookPage({ book}) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
       <BookDetails book={book} />
       <DarkModeToggle />
    </div>
  );
}

export async function getStaticProps({ params }) {
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
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/allbooks');
  const data = await res.json();
  const books = data.featuredBooks || data.books || [];
  const paths = books.map((book) => ({
    params: { id: book.id.toString() },
  }));

  return {
    paths,
    fallback: true, // Enable fallback for ISR
  };
}
