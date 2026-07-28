import { WiHumidity, WiStrongWind, WiBarometer, WiFog, WiSunrise, WiSunset } from 'react-icons/wi';
import { formatClockTime } from '../../utils/formatters';
import type { CurrentWeather } from '../../types/weather';
import styles from './WeatherDetails.module.css';

interface WeatherDetailsProps {
  current: CurrentWeather;
}

export function WeatherDetails({ current }: WeatherDetailsProps) {
  const stats = [
    { label: 'Kelembapan', value: `${current.humidity}%`, icon: WiHumidity },
    { label: 'Kecepatan angin', value: `${current.windSpeed} km/j`, icon: WiStrongWind },
    { label: 'Tekanan udara', value: `${current.pressure} hPa`, icon: WiBarometer },
    { label: 'Jarak pandang', value: `${current.visibility} km`, icon: WiFog },
    { label: 'Matahari terbit', value: formatClockTime(current.sunrise), icon: WiSunrise },
    { label: 'Matahari terbenam', value: formatClockTime(current.sunset), icon: WiSunset },
  ];

  return (
    <section className={styles.grid}>
      {stats.map(({ label, value, icon: Icon }) => (
        <div key={label} className={styles.card}>
          <Icon className={styles.icon} aria-hidden="true" />
          <div>
            <p className={styles.label}>{label}</p>
            <p className={`${styles.value} tabular-nums`}>{value}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
