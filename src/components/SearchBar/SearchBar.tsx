import { FiSearch } from 'react-icons/fi';
import { useCitySearch } from '../../hooks/useCitySearch';
import type { GeoLocation } from '../../types/weather';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSelectCity: (city: GeoLocation) => void;
}

export function SearchBar({ onSelectCity }: SearchBarProps) {
  const { query, setQuery, results, isSearching } = useCitySearch();

  function handleSelect(city: GeoLocation) {
    onSelectCity(city);
    setQuery('');
  }

  const showResults = query.trim().length >= 2;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputRow}>
        <FiSearch className={styles.searchIcon} aria-hidden="true" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari kota…"
          className={styles.input}
          aria-label="Cari kota"
        />
      </div>

      {showResults && (
        <ul className={styles.results}>
          {isSearching && <li className={styles.status}>Mencari…</li>}

          {!isSearching && results.length === 0 && (
            <li className={styles.status}>Kota tidak ditemukan</li>
          )}

          {!isSearching &&
            results.map((city) => (
              <li key={city.id}>
                <button
                  type="button"
                  className={styles.resultItem}
                  onClick={() => handleSelect(city)}
                >
                  <span className={styles.cityName}>{city.name}</span>
                  <span className={styles.cityRegion}>
                    {[city.admin1, city.country].filter(Boolean).join(', ')}
                  </span>
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
