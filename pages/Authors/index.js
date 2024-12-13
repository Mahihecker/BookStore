import useSWR from "swr";
import DarkModeToggle from '../../components/DarkModeToggle';
import AuthorList from "../../components/AuthorList";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AllAuthors() {
  const { data, error } = useSWR("/api/allauthor", fetcher);

  if (error) return <div>Failed to load authors.</div>;
  if (!data) return <div>Loading authors...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Authors</h1>
      <AuthorList authors={data.bookAuthorIds} />
      <DarkModeToggle />
    </div>
  );
}
