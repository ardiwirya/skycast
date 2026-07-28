import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Data dari{' '}
        <a href="https://open-meteo.com" target="_blank" rel="noreferrer">
          Open-Meteo
        </a>
      </p>
      <p>
        Dibuat oleh{' '}
        <a href="https://github.com/ardiwirya" target="_blank" rel="noreferrer">
          Ardi Wirya
        </a>
      </p>
    </footer>
  );
}
