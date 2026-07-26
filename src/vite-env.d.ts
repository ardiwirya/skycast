/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEATHER_API_BASE_URL?: string;
  readonly VITE_GEOCODING_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
