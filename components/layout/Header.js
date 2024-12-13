import Link from 'next/link';
import styles from './Header.module.css';
import SearchBar from '../SearchBar';
import { useData } from '../DataContext';
import { useAuth } from '../context/AuthContext'; // Import AuthContext for user state

export default function Header() {
  const { books, authors, genres } = useData();
  const { user, logout } = useAuth(); // Access user and logout from AuthContext

  return (
    <header className={styles.header}>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>Book Store</h1>
        <div className={styles.buttons}>
          <Link href="/books">
            <button className={styles.button}>View All Books</button>
          </Link>
          <Link href="/genere">
            <button className={styles.button}>View Genres</button>
          </Link>
          <Link href="/">
            <button className={styles.button}>Featured Books</button>
          </Link>
          <Link href="/Authors">
            <button className={styles.button}>View all authors</button>
          </Link>
          <Link href="/info">
            <button className={styles.button}>Info</button>
          </Link>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <SearchBar books={books} authors={authors} genres={genres} />
      </div>
      <div className={styles.authSection}>
        {user ? (
          <>
            <span className={styles.userEmail}>Welcome, {user.email}</span>
            <button onClick={logout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">
            <button className={styles.loginButton}>Login</button>
          </Link>
        )}
      </div>
    </header>
  );
}
