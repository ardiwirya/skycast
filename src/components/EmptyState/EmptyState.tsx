import { WiDaySunny } from 'react-icons/wi';
import styles from './EmptyState.module.css';

export function EmptyState() {
  return (
    <div className={styles.wrapper}>
      <WiDaySunny className={styles.icon} aria-hidden="true" />
      <h2 className={styles.title}>Search for a city to get started</h2>
      <p className={styles.subtitle}>
        Look up any city to see current conditions and the 7-day forecast.
      </p>
    </div>
  );
}
