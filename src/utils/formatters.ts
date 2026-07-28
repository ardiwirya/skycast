/**
 * Formats an ISO time string (e.g. "2026-07-27T14:00") into a 24-hour
 * hour label, e.g. "06".
 */
export function formatHour(isoTime: string): string {
  const date = new Date(isoTime);
  return date.toLocaleTimeString('id-ID', { hour: 'numeric' });
}

/**
 * Formats an ISO time string into a clock time, e.g. "05.42".
 */
export function formatClockTime(isoTime: string): string {
  const date = new Date(isoTime);
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Formats an ISO date string into a short weekday label, e.g. "Sen".
 * Returns "Hari Ini" for the current date.
 */
export function formatWeekday(isoDate: string): string {
  const date = new Date(isoDate);
  const today = new Date();

  if (date.toDateString() === today.toDateString()) {
    return 'Hari Ini';
  }

  return date.toLocaleDateString('id-ID', { weekday: 'short' });
}

/**
 * Returns how far the current time is between sunrise and sunset, as a
 * percentage from 0 to 100. Values outside that range (nighttime) are
 * clamped so the caller can render a simple progress indicator.
 */
export function getDayProgress(currentTime: string, sunrise: string, sunset: string): number {
  const current = new Date(currentTime).getTime();
  const sunriseTime = new Date(sunrise).getTime();
  const sunsetTime = new Date(sunset).getTime();

  if (sunsetTime <= sunriseTime) {
    return 0;
  }

  const progress = ((current - sunriseTime) / (sunsetTime - sunriseTime)) * 100;
  return Math.min(100, Math.max(0, progress));
}

/**
 * Formats an ISO date string into a readable full date, e.g. "Selasa, 28 Juli 2026".
 */
export function formatFullDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
