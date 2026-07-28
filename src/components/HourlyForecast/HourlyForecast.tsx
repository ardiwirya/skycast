import { getWeatherCodeInfo } from '../../utils/weatherCode';
import { formatFullDate, formatHour } from '../../utils/formatters';
import type { HourlyForecastItem } from '../../types/weather';
import styles from './HourlyForecast.module.css';

interface HourlyForecastProps {
  hours: HourlyForecastItem[];
}

export function HourlyForecast({ hours }: HourlyForecastProps) {
  const today = hours[0]?.time;

  return (
    <section>
      <h2 className={styles.title}>
        Hari Ini{today && <span className={styles.date}>, {formatFullDate(today)}</span>}
      </h2>
      <div className={styles.scrollArea}>
        {hours.map((hour, index) => {
          const { icon: Icon } = getWeatherCodeInfo(hour.weatherCode, hour.isDay);
          return (
            <div key={hour.time} className={styles.item}>
              <span className={styles.time}>
                {index === 0 ? 'Sekarang' : formatHour(hour.time)}
              </span>
              <Icon className={styles.icon} aria-hidden="true" />
              <span className={`${styles.temperature} tabular-nums`}>{hour.temperature}°</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
