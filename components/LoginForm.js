import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link'; // Importing Link
import styles from '../styles/LoginForm.module.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);

    const success = await login(email, password);
    if (success) {
      router.push('/');
    } else {
      setNotification({ type: 'error', message: 'Invalid email or password!' });
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Login</h2>
        {notification && (
          <div
            className={`${styles.notification} ${
              notification.type === 'error' ? styles.error : styles.success
            }`}
          >
            {notification.message}
          </div>
        )}
        <label className={styles.label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          placeholder="Enter your email"
          required
        />
        <label className={styles.label}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="Enter your password"
          required
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
        <p className={styles.linkText}>
          Don't have an account?{' '}
          <Link href="/signup" className={styles.link}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
