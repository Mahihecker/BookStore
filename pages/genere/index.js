import GenreList from "../../components/GenreList";
import DarkModeToggle from '../../components/DarkModeToggle';
export default function Genres({ genres }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Genres</h1>
      <GenreList genres={genres} />
      <DarkModeToggle />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/genres");
  const data = await res.json();

  return {
    props: {
      genres: data.genre,
    },
  };
}
