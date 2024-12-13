import { useRouter } from 'next/router';
import DarkModeToggle from '../../../../../components/DarkModeToggle';
import AuthorDetails from '../../../../../components/AuthorDetails';
import ProtectedRoute from '../../../../../components/ProtectedRoute';

export default function AuthorPage({ author }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <AuthorDetails author={author} />
        <DarkModeToggle />
      </div>
    </ProtectedRoute>
  );
}

export async function getStaticProps({ params }) {
  try {
    const { ids } = params; // Use custom `ids` from the URL params
    const res = await fetch(`http://localhost:3000/api/author/${ids}`);
    const authorData = await res.json();

    if (!authorData || !authorData.author) {
      return { notFound: true }; // Handle case where author is not found
    }

    return {
      props: {
        author: authorData.author,
      },
      revalidate: 86400, // Revalidate every 24 hours
    };
  } catch (error) {
    console.error('Error fetching author details:', error);
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  try {
    const res = await fetch('http://localhost:3000/api/allauthor');
    const data = await res.json();

    const paths = data.map((entry) => ({
      params: {
        id: entry.bookId.toString(), // Custom book ID
        ids: entry.authorId.toString(), // Custom author ID
      },
    }));

    return {
      paths,
      fallback: true, // Enable fallback for ISR
    };
  } catch (error) {
    console.error('Error fetching paths:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
}
