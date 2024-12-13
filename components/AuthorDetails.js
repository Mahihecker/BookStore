import styles from "./AuthorDetails.module.css";

export default function AuthorDetails({ author }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{author.name}</h1>
      <p className={styles.biography}>{author.biography}</p>
      <p className={styles.dates}>
        Born: {author.birthDate ? new Date(author.birthDate).toDateString() : "N/A"}
      </p>
      {author.deathDate && (
        <p className={styles.dates}>
          Died: {new Date(author.deathDate).toDateString()}
        </p>
      )}
    </div>
  );
}
