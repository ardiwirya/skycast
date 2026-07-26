/**
 * Domain types for weather data.
 * Shapes here are intentionally simplified from the raw Open-Meteo response -
 * services/ is responsible for mapping the API payload into these types.
 */

export interface GeoLocation {
  id: number;
  name: string;
  country: string;
  admin1?: string; // state / province, when available
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface CurrentWeather {
  time: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  weatherCode: number;
  isDay: boolean;
  sunrise: string;
  sunset: string;
}

export interface HourlyForecastItem {
  time: string;
  temperature: number;
  weatherCode: number;
  isDay: boolean;
}

export interface DailyForecastItem {
  date: string;
  weatherCode: number;
  temperatureMax: number;
  temperatureMin: number;
  precipitationProbability: number;
}

export interface WeatherForecast {
  location: GeoLocation;
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
}
