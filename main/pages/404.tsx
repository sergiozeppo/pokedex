import Link from 'next/link';
import styles from '../src/components/ErrorBoundary/ErrorBoundary.module.css';

export default function NotFound() {
  return (
    <div className={styles['error-container']}>
      <img
        className="broken-pokeball"
        src="/assets/img/broken-pokeball.png"
        alt="not-found"
      />

      <h2>Not Found.</h2>

      <Link href="/">
        <button className={styles['reset-button']}>Return</button>
      </Link>
    </div>
  );
}
