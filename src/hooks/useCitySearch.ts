import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';
import { searchCities } from '../services/geocodingService';
import type { GeoLocation } from '../types/weather';

interface UseCitySearchResult {
  query: string;
  setQuery: (value: string) => void;
  results: GeoLocation[];
  isSearching: boolean;
}

export function useCitySearch(): UseCitySearchResult {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();

    if (trimmedQuery.length < 2) {
      setResults([]);
      return;
    }

    let isStale = false;
    setIsSearching(true);

    searchCities(trimmedQuery)
      .then((cities) => {
        if (!isStale) {
          setResults(cities);
        }
      })
      .catch(() => {
        if (!isStale) {
          setResults([]);
        }
      })
      .finally(() => {
        if (!isStale) {
          setIsSearching(false);
        }
      });

    return () => {
      isStale = true;
    };
  }, [debouncedQuery]);

  return { query, setQuery, results, isSearching };
}
