import styles from "./GenreHeader.module.css";

export default function GenreHeader({ genre }) {
  return (
    <div className={styles.genreHeader}>
      <h1 className={styles.genreTitle}>Books in {genre.name}</h1>
    </div>
  );
}
