import { getWeatherCodeInfo } from '../../utils/weatherCode';
import { formatClockTime, getDayProgress } from '../../utils/formatters';
import type { CurrentWeather as CurrentWeatherData, GeoLocation } from '../../types/weather';
import styles from './CurrentWeather.module.css';

interface CurrentWeatherProps {
  location: GeoLocation;
  current: CurrentWeatherData;
}

export function CurrentWeather({ location, current }: CurrentWeatherProps) {
  const { label, icon: WeatherIcon } = getWeatherCodeInfo(current.weatherCode, current.isDay);
  const dayProgress = getDayProgress(current.time, current.sunrise, current.sunset);

  return (
    <section className={styles.card}>
      <div className={styles.locationRow}>
        <h1 className={styles.cityName}>{location.name}</h1>
        <span className={styles.country}>
          {[location.admin1, location.country].filter(Boolean).join(', ')}
        </span>
      </div>

      <div className={styles.mainRow}>
        <WeatherIcon className={styles.weatherIcon} aria-hidden="true" />
        <div>
          <p className={`${styles.temperature} tabular-nums`}>{current.temperature}°</p>
          <p className={styles.condition}>{label}</p>
          <p className={styles.feelsLike}>Feels like {current.feelsLike}°</p>
        </div>
      </div>

      <div className={styles.dayProgress}>
        <div className={styles.dayProgressTrack}>
          <div className={styles.dayProgressFill} style={{ width: `${dayProgress}%` }} />
          <div className={styles.dayProgressMarker} style={{ left: `${dayProgress}%` }} />
        </div>
        <div className={styles.dayProgressLabels}>
          <span>Sunrise {formatClockTime(current.sunrise)}</span>
          <span>Sunset {formatClockTime(current.sunset)}</span>
        </div>
      </div>
    </section>
  );
}
