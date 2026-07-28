# Skycast

A weather forecast web app built with React, TypeScript and Vite. Search any city to see current conditions, an hourly outlook for today, and a 7-day forecast.

## Live Demo

[Live Demo](https://indo-skycast.vercel.app/)

## Preview

![Screencapture](/assets/preview.png)

## Features

- City search with debounced autocomplete
- Current conditions: temperature, feels like, humidity, wind speed, pressure, visibility
- Sunrise / sunset with a day-progress indicator
- Hourly forecast for the next 24 hours
- 7-day forecast
- Loading, error and empty states
- Responsive layout (mobile, tablet, desktop)
- Dark theme

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- CSS Modules
- [Axios](https://axios-http.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Open-Meteo](https://open-meteo.com/) (weather + geocoding API, no API key required)
- ESLint + Prettier

## Installation

```bash
git clone https://github.com/ardiwirya/skycast.git
cd skycast
npm install
```

## Environment Variables

Open-Meteo does not require an API key. The `.env` file only holds the API base URLs, which keeps the project ready to point at a different environment later without touching the code.

Copy the example file:

```bash
cp .env.example .env
```

`.env`

```
VITE_WEATHER_API_BASE_URL=https://api.open-meteo.com/v1
VITE_GEOCODING_API_BASE_URL=https://geocoding-api.open-meteo.com/v1
```

## Running the Project

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

## Build Project

```bash
npm run build
```

Output is generated in the `dist/` folder. Preview the production build locally with:

```bash
npm run preview
```

## Linting & Formatting

```bash
npm run lint
npm run format
```

## Deployment

This project deploys to [Vercel](https://vercel.com) with no extra configuration.

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Vercel auto-detects the Vite preset (build command `npm run build`, output directory `dist`).
4. Add the two environment variables from `.env.example` in the Vercel project settings.
5. Deploy.

## Folder Structure

```
src/
  components/     Reusable UI components (one folder per component)
  pages/          Page-level components
  hooks/          Custom React hooks
  services/       API clients and data-fetching functions
  types/          Shared TypeScript types
  utils/          Formatting and mapping helpers
  styles/         Global styles and design tokens
```

## Future Improvements

- Add unit tests for services and hooks
- Persist the last searched city in local storage
- Add a unit toggle (°C / °F)
- Add a "use my location" option using the Geolocation API

## Acknowledgements

- Weather and geocoding data from [Open-Meteo](https://open-meteo.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
