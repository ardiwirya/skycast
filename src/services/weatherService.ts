import { forecastClient } from './apiClient';
import type {
  CurrentWeather,
  DailyForecastItem,
  GeoLocation,
  HourlyForecastItem,
  WeatherForecast,
} from '../types/weather';

interface ForecastApiResponse {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    surface_pressure: number;
    weather_code: number;
    is_day: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    is_day: number[];
    visibility: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    sunrise: string[];
    sunset: string[];
  };
}

/**
 * Fetches current conditions plus today's hourly and the 7-day forecast
 * for a given location, and maps the response into our domain types.
 */
export async function getForecast(location: GeoLocation): Promise<WeatherForecast> {
  const { data } = await forecastClient.get<ForecastApiResponse>('/forecast', {
    params: {
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone,
      forecast_days: 7,
      current: [
        'temperature_2m',
        'apparent_temperature',
        'relative_humidity_2m',
        'wind_speed_10m',
        'surface_pressure',
        'weather_code',
        'is_day',
      ].join(','),
      hourly: ['temperature_2m', 'weather_code', 'is_day', 'visibility'].join(','),
      daily: [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'precipitation_probability_max',
        'sunrise',
        'sunset',
      ].join(','),
    },
  });

  return {
    location,
    current: mapCurrentWeather(data),
    hourly: mapHourlyForecast(data),
    daily: mapDailyForecast(data),
  };
}

function mapCurrentWeather(data: ForecastApiResponse): CurrentWeather {
  const { current, hourly, daily } = data;
  const currentHourIndex = hourly.time.indexOf(current.time);

  return {
    time: current.time,
    temperature: Math.round(current.temperature_2m),
    feelsLike: Math.round(current.apparent_temperature),
    humidity: current.relative_humidity_2m,
    windSpeed: Math.round(current.wind_speed_10m),
    pressure: Math.round(current.surface_pressure),
    visibility: currentHourIndex >= 0 ? Math.round(hourly.visibility[currentHourIndex] / 1000) : 0,
    weatherCode: current.weather_code,
    isDay: current.is_day === 1,
    sunrise: daily.sunrise[0],
    sunset: daily.sunset[0],
  };
}

function mapHourlyForecast(data: ForecastApiResponse): HourlyForecastItem[] {
  const { current, hourly } = data;
  const startIndex = hourly.time.indexOf(current.time);

  if (startIndex === -1) {
    return [];
  }

  // Next 24 hours starting from the current hour.
  return hourly.time.slice(startIndex, startIndex + 24).map((time, offset) => {
    const index = startIndex + offset;
    return {
      time,
      temperature: Math.round(hourly.temperature_2m[index]),
      weatherCode: hourly.weather_code[index],
      isDay: hourly.is_day[index] === 1,
    };
  });
}

function mapDailyForecast(data: ForecastApiResponse): DailyForecastItem[] {
  const { daily } = data;

  return daily.time.map((date, index) => ({
    date,
    weatherCode: daily.weather_code[index],
    temperatureMax: Math.round(daily.temperature_2m_max[index]),
    temperatureMin: Math.round(daily.temperature_2m_min[index]),
    precipitationProbability: daily.precipitation_probability_max[index],
  }));
}
