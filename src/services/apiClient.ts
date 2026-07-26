import axios from 'axios';

/**
 * Open-Meteo does not require an API key, but the base URLs still live in
 * environment variables. This keeps the codebase ready for staging/prod
 * environments or a future provider swap without touching call sites.
 */
const FORECAST_BASE_URL =
  import.meta.env.VITE_WEATHER_API_BASE_URL ?? 'https://api.open-meteo.com/v1';

const GEOCODING_BASE_URL =
  import.meta.env.VITE_GEOCODING_API_BASE_URL ?? 'https://geocoding-api.open-meteo.com/v1';

export const forecastClient = axios.create({
  baseURL: FORECAST_BASE_URL,
  timeout: 10_000,
});

export const geocodingClient = axios.create({
  baseURL: GEOCODING_BASE_URL,
  timeout: 10_000,
});
