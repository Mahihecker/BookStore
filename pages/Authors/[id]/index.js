import { useRouter } from "next/router";
import DarkModeToggle from "../../../components/DarkModeToggle";
import AuthorDetails from "../../../components/AuthorDetails";

export default function AuthorPage({ author }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <AuthorDetails author={author} />
      <DarkModeToggle />
    </div>
  );
}

export async function getStaticProps({ params }) {
  try {
    // Fetch the author details by ID
    const res = await fetch(`http://localhost:3000/api/author/${params.id}`);
    const authorData = await res.json();

    if (!authorData || !authorData.author) {
      return { notFound: true };
    }

    return {
      props: {
        author: authorData.author,
      },
      revalidate: 86400, // Revalidate every 24 hours
    };
  } catch (error) {
    console.error("Error fetching author details:", error);
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  try {
    // Fetch all authors for static path generation
    const res = await fetch("http://localhost:3000/api/allauthor");
    const authors = await res.json();

    const paths = authors.map((author) => ({
      params: { id: author.id.toString() }, // Use `id` from MongoDB `authors` collection
    }));

    return {
      paths,
      fallback: true, // Enable fallback for ISR
    };
  } catch (error) {
    console.error("Error fetching paths:", error);
    return {
      paths: [],
      fallback: true,
    };
  }
}
