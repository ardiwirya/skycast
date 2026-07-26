import { getWeatherCodeInfo } from '../../utils/weatherCode';
import { formatHour } from '../../utils/formatters';
import type { HourlyForecastItem } from '../../types/weather';
import styles from './HourlyForecast.module.css';

interface HourlyForecastProps {
  hours: HourlyForecastItem[];
}

export function HourlyForecast({ hours }: HourlyForecastProps) {
  return (
    <section>
      <h2 className={styles.title}>Today</h2>
      <div className={styles.scrollArea}>
        {hours.map((hour, index) => {
          const { icon: Icon } = getWeatherCodeInfo(hour.weatherCode, hour.isDay);
          return (
            <div key={hour.time} className={styles.item}>
              <span className={styles.time}>{index === 0 ? 'Now' : formatHour(hour.time)}</span>
              <Icon className={styles.icon} aria-hidden="true" />
              <span className={`${styles.temperature} tabular-nums`}>{hour.temperature}°</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
