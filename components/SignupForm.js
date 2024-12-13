import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link'; // Importing Link
import styles from '../styles/LoginForm.module.css'; // Reusing the same CSS for consistent design

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);

    const success = await signup(username, email, password);
    if (success) {
      setNotification({ type: 'success', message: 'Account created successfully!' });
      setTimeout(() => {
        router.push('/login'); // Redirect to login page after successful signup
      }, 2000);
    } else {
      setNotification({ type: 'error', message: 'Signup failed!' });
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Sign Up</h2>
        {notification && (
          <div
            className={`${styles.notification} ${
              notification.type === 'error' ? styles.error : styles.success
            }`}
          >
            {notification.message}
          </div>
        )}
        <label className={styles.label}>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          placeholder="Enter your username"
          required
        />
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
          Sign Up
        </button>
        <p className={styles.linkText}>
          Already have an account?{' '}
          <Link href="/login" className={styles.link}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
