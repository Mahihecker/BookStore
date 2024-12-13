import Link from 'next/link';
import styles from './BookDetails.module.css';

export default function BookDetails({ book }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{book.title}</h1>
      <p className={styles.description}>{book.description}</p>
      <p className={styles.price}>Price: ${book.price}</p>
      <p className={styles.rating}>Rating: {book.rating}</p>
      {/* Use book._id and book.authorId */}
      <Link href={`/books/${book._id}/author/${book.authorId}`} className={styles.authorLink}>
        About the Author
      </Link>
    </div>
  );
}
