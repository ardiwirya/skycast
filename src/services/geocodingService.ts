import { geocodingClient } from './apiClient';
import type { GeoLocation } from '../types/weather';

interface GeocodingApiResult {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

interface GeocodingApiResponse {
  results?: GeocodingApiResult[];
}

/**
 * Looks up cities matching the given query.
 * Returns an empty array when nothing matches instead of throwing,
 * so callers can render an empty state without extra error handling.
 */
export async function searchCities(query: string): Promise<GeoLocation[]> {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length < 2) {
    return [];
  }

  const { data } = await geocodingClient.get<GeocodingApiResponse>('/search', {
    params: {
      name: trimmedQuery,
      count: 5,
      language: 'en',
      format: 'json',
    },
  });

  return (data.results ?? []).map((result) => ({
    id: result.id,
    name: result.name,
    country: result.country,
    admin1: result.admin1,
    latitude: result.latitude,
    longitude: result.longitude,
    timezone: result.timezone,
  }));
}
