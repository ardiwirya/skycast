import type { IconType } from 'react-icons';
import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloud,
  WiCloudy,
  WiFog,
  WiDayShowers,
  WiNightAltShowers,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from 'react-icons/wi';

export interface WeatherCodeInfo {
  label: string;
  icon: IconType;
}

/**
 * Open-Meteo uses the WMO weather interpretation codes.
 * Reference: https://open-meteo.com/en/docs
 */
export function getWeatherCodeInfo(code: number, isDay = true): WeatherCodeInfo {
  switch (code) {
    case 0:
      return { label: 'Clear sky', icon: isDay ? WiDaySunny : WiNightClear };
    case 1:
      return { label: 'Mostly clear', icon: isDay ? WiDaySunny : WiNightClear };
    case 2:
      return { label: 'Partly cloudy', icon: isDay ? WiDayCloudy : WiNightAltCloudy };
    case 3:
      return { label: 'Overcast', icon: WiCloudy };
    case 45:
    case 48:
      return { label: 'Fog', icon: WiFog };
    case 51:
    case 53:
    case 55:
      return { label: 'Drizzle', icon: isDay ? WiDayShowers : WiNightAltShowers };
    case 56:
    case 57:
      return { label: 'Freezing drizzle', icon: isDay ? WiDayShowers : WiNightAltShowers };
    case 61:
    case 63:
    case 65:
      return { label: 'Rain', icon: WiRain };
    case 66:
    case 67:
      return { label: 'Freezing rain', icon: WiRain };
    case 71:
    case 73:
    case 75:
    case 77:
      return { label: 'Snow', icon: WiSnow };
    case 80:
    case 81:
    case 82:
      return { label: 'Rain showers', icon: isDay ? WiDayShowers : WiNightAltShowers };
    case 85:
    case 86:
      return { label: 'Snow showers', icon: WiSnow };
    case 95:
    case 96:
    case 99:
      return { label: 'Thunderstorm', icon: WiThunderstorm };
    default:
      return { label: 'Cloudy', icon: WiCloud };
  }
}
