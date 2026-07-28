import { WiDaySunny } from 'react-icons/wi';
import styles from './EmptyState.module.css';

export function EmptyState() {
  return (
    <div className={styles.wrapper}>
      <WiDaySunny className={styles.icon} aria-hidden="true" />
      <h2 className={styles.title}>Cari kota untuk memulai</h2>
      <p className={styles.subtitle}>
        Cari kota mana pun untuk melihat kondisi cuaca saat ini dan prakiraan 7 hari ke depan.
      </p>
    </div>
  );
}
