import { useAuth } from '../context/AuthContext';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.welcome}>Welcome, {user?.email}</h1>
      <button onClick={logout} className={styles.logoutButton}>Logout</button>
    </div>
  );
}
