import Link from "next/link";
import styles from "./AuthorList.module.css";

export default function AuthorList({ authors }) {
  return (
    <ul className={styles.authorList}>
      {authors.map((author) => (
        <li key={author.id} className={styles.authorItem}>
          {/* Ensure proper routing to the author's details page */}
          <Link href={`/Authors/${author.id}`}>
            {author.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
