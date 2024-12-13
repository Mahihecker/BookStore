import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/LoginForm.module.css';

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>Login</h1>
      <label className={styles.label}>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
        required
      />
      <label className={styles.label}>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
        required
      />
      <button type="submit" className={styles.button}>Login</button>
    </form>
  );
}
