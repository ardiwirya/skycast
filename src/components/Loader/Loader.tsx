import styles from './Loader.module.css';

interface LoaderProps {
  label?: string;
}

export function Loader({ label = 'Loading forecast…' }: LoaderProps) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <p className={styles.label}>{label}</p>
    </div>
  );
}
