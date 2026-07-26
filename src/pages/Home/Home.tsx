import { useState } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { CurrentWeather } from '../../components/CurrentWeather/CurrentWeather';
import { WeatherDetails } from '../../components/WeatherDetails/WeatherDetails';
import { HourlyForecast } from '../../components/HourlyForecast/HourlyForecast';
import { WeeklyForecast } from '../../components/WeeklyForecast/WeeklyForecast';
import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { useWeather } from '../../hooks/useWeather';
import type { GeoLocation } from '../../types/weather';
import styles from './Home.module.css';

export function Home() {
  const [selectedCity, setSelectedCity] = useState<GeoLocation | null>(null);
  const { forecast, isLoading, error, retry } = useWeather(selectedCity);

  return (
    <main className={styles.main}>
      <SearchBar onSelectCity={setSelectedCity} />

      <div className={styles.content}>
        {!selectedCity && <EmptyState />}

        {selectedCity && isLoading && <Loader />}

        {selectedCity && !isLoading && error && <ErrorMessage message={error} onRetry={retry} />}

        {selectedCity && !isLoading && !error && forecast && (
          <div className={styles.forecastLayout}>
            <CurrentWeather location={forecast.location} current={forecast.current} />
            <WeatherDetails current={forecast.current} />
            <HourlyForecast hours={forecast.hourly} />
            <WeeklyForecast days={forecast.daily} />
          </div>
        )}
      </div>
    </main>
  );
}
