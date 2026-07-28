import { WiRaindrop } from 'react-icons/wi';
import { getWeatherCodeInfo } from '../../utils/weatherCode';
import { formatWeekday } from '../../utils/formatters';
import type { DailyForecastItem } from '../../types/weather';
import styles from './WeeklyForecast.module.css';

interface WeeklyForecastProps {
  days: DailyForecastItem[];
}

export function WeeklyForecast({ days }: WeeklyForecastProps) {
  return (
    <section>
      <h2 className={styles.title}>Prakiraan 7 hari</h2>
      <div className={styles.list}>
        {days.map((day) => {
          const { label, icon: Icon } = getWeatherCodeInfo(day.weatherCode);
          return (
            <div key={day.date} className={styles.row}>
              <span className={styles.day}>{formatWeekday(day.date)}</span>

              <span className={styles.condition}>
                <Icon className={styles.icon} aria-hidden="true" />
                {label}
              </span>

              <span className={styles.precipitation}>
                <WiRaindrop className={styles.rainIcon} aria-hidden="true" />
                {day.precipitationProbability}%
              </span>

              <span className={`${styles.temperatures} tabular-nums`}>
                <span className={styles.max}>{day.temperatureMax}°</span>
                <span className={styles.min}>{day.temperatureMin}°</span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
