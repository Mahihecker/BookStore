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
  try {
    const resGenre = await fetch(`http://localhost:3000/api/genres`);
    const genresData = await resGenre.json();

    const genre = genresData.genre.find((g) => g.id === params.id); // Match the `id` field
    if (!genre) {
      console.error("Genre not found for ID:", params.id);
      return { notFound: true };
    }

    const resBooks = await fetch(`http://localhost:3000/api/genre/${params.id}`);
    const booksData = await resBooks.json();

    if (!booksData.books || booksData.books.length === 0) {
      console.log("No books found for this genre.");
      return {
        props: {
          genre,
          books: [],
        },
      };
    }

    return {
      props: {
        genre,
        books: booksData.books,
      },
    };
  } catch (error) {
    console.error("Error fetching genre or books:", error);
    return { notFound: true };
  }
}

