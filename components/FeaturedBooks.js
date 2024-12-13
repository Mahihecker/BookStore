import Link from 'next/link';
import styles from './FeaturedBooks.module.css';

export default function FeaturedBooks({ books }) {
  return (
    <div className={styles.gridContainer}>
      {books.map((book) => (
        <div key={book.id} className={styles.bookCard}>
          <h2 className={styles.bookTitle}>{book.title}</h2>
          <p className={styles.bookDescription}>{book.description}</p>
          <Link href={`/books/${book.id}`}>
            <p className={styles.viewDetails}>View Details</p>
          </Link>
        </div>
      ))}
    </div>
  );
}