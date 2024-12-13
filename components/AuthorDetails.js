import styles from './AuthorDetails.module.css';

export default function AuthorDetails({ author }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{author.name}</h1>
      <p className={styles.biography}>{author.biography}</p>
    </div>
  );
}
