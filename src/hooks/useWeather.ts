import { useEffect, useState } from 'react';
import { getForecast } from '../services/weatherService';
import type { GeoLocation, WeatherForecast } from '../types/weather';

interface UseWeatherResult {
  forecast: WeatherForecast | null;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

export function useWeather(location: GeoLocation | null): UseWeatherResult {
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!location) {
      return;
    }

    let isStale = false;
    setIsLoading(true);
    setError(null);

    getForecast(location)
      .then((data) => {
        if (!isStale) {
          setForecast(data);
        }
      })
      .catch(() => {
        if (!isStale) {
          setError('Could not load the forecast. Please try again.');
        }
      })
      .finally(() => {
        if (!isStale) {
          setIsLoading(false);
        }
      });

    return () => {
      isStale = true;
    };
  }, [location, retryCount]);

  function retry() {
    setRetryCount((count) => count + 1);
  }

  return { forecast, isLoading, error, retry };
}
