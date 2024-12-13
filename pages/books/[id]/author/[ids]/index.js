import { useRouter } from 'next/router';
import DarkModeToggle from '../../../../../components/DarkModeToggle';
import AuthorDetails from '../../../../../components/AuthorDetails';
import ProtectedRoute from '../../components/ProtectedRoute';
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
  const res = await fetch(`http://localhost:3000/api/author/${params.id}`);
  const authorData = await res.json();

  if (!authorData || !authorData.author) {
    return { notFound: true };
  }

  return {
    props: {
      author: authorData.author,
    },
    revalidate: 86400,
  };
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/allauthor');
  const data = await res.json();

  const paths = data.bookAuthorIds.map((entry) => ({
    params: { id: entry.id.toString(), ids: entry.authorId.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}
