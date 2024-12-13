import Link from "next/link";
import styles from "./GenreList.module.css";

export default function GenreList({ genres }) {
  return (
    <ul className={styles.genreList}>
      {genres.map((genre) => (
        <li key={genre.id} className={styles.genreItem}>
          <Link href={`/genere/${genre.id}`}>
            {`Genre ID: ${genre.name}`}
          </Link>
        </li>
      ))}
    </ul>
  );
}