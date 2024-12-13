import Link from "next/link";
import styles from "./AuthorList.module.css";

export default function AuthorList({ authors }) {
  return (
    <ul className={styles.authorList}>
      {authors.map((author) => (
        <li key={author.authorId} className={styles.authorItem}>
          <Link href={`/Authors/${author.authorId}`}>
             {`Author ID: ${author.authorId}`}
          </Link>
        </li>
      ))}
    </ul>
  );
}
