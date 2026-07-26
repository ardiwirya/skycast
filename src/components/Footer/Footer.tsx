import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Data from{' '}
        <a href="https://open-meteo.com" target="_blank" rel="noreferrer">
          Open-Meteo
        </a>
      </p>
      <p>
        Built by{' '}
        <a href="https://github.com" target="_blank" rel="noreferrer">
          your name
        </a>
      </p>
    </footer>
  );
}
