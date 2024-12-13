import { useRouter } from "next/router";
import GenreHeader from "../../../components/GenreHeader";
import FeaturedBooks from "../../../components/FeaturedBooks";
import DarkModeToggle from "../../../components/DarkModeToggle";

export default function GenreBooks({ genre, books }) {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <GenreHeader genre={genre} />
      <FeaturedBooks books={books} />
      <DarkModeToggle />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const resGenre = await fetch("http://localhost:3000/api/genres");
  const genresData = await resGenre.json();
  const genre = genresData.genre.find((g) => g.id === params.id);

  if (!genre) {
    return { notFound: true };
  }

  const resBooks = await fetch(`http://localhost:3000/api/genre/${params.id}`);
  const booksData = await resBooks.json();

  return {
    props: {
      genre,
      books: booksData.books,
    },
  };
}
