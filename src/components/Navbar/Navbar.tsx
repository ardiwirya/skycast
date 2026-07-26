import { WiCloud } from 'react-icons/wi';
import styles from './Navbar.module.css';

export function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <WiCloud className={styles.brandIcon} aria-hidden="true" />
          <span className={styles.brandName}>Skycast</span>
        </div>
        <p className={styles.tagline}>Weather forecast, done simply</p>
      </div>
    </header>
  );
}
