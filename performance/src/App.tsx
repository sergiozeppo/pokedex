import { useState, useEffect, useMemo, useCallback } from 'react';
import { Country, fetchCountries } from './api/api';
import Card from './components/Card/Card';
import Header from './components/Header/Header';
import './App.css';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortOrder, setSortOrder] = useState({ key: 'name', asc: true });
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  useEffect(() => {
    const savedVisited = localStorage.getItem('sergiozeppo_visited');
    if (savedVisited) {
      setVisited(JSON.parse(savedVisited));
    }
  }, []);

  const filteredCountries = useMemo(() => {
    return countries
      .filter((country) =>
        searchTerm
          ? country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      )
      .filter((country) =>
        selectedRegion ? country.region === selectedRegion : true
      )
      .sort((a, b) => {
        if (sortOrder.key === 'name') {
          return sortOrder.asc
            ? a.name.common.localeCompare(b.name.common)
            : b.name.common.localeCompare(a.name.common);
        } else {
          return sortOrder.asc
            ? a.population - b.population
            : b.population - a.population;
        }
      });
  }, [searchTerm, selectedRegion, sortOrder, countries]);

  const handleSearch = useCallback((value: string) => setSearchTerm(value), []);
  const handleFilter = useCallback(
    (value: string) => setSelectedRegion(value),
    []
  );
  const handleSort = useCallback(
    (key: string, asc: boolean) => setSortOrder({ key, asc }),
    []
  );

  const toggleVisited = useCallback((countryName: string) => {
    setVisited((prev) => {
      const updatedVisited = prev.includes(countryName)
        ? prev.filter((name) => name !== countryName)
        : [...prev, countryName];

      localStorage.setItem(
        'sergiozeppo_visited',
        JSON.stringify(updatedVisited)
      );
      return updatedVisited;
    });
  }, []);

  return (
    <div className="p-4">
      <Header
        searchTerm={searchTerm}
        selectedRegion={selectedRegion}
        sortOrder={sortOrder}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onSort={handleSort}
      />

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCountries.map((country) => (
          <Card
            key={country.name.common}
            name={country.name.common}
            flag={country.flags.svg}
            population={country.population}
            region={country.region}
            visited={visited.includes(country.name.common)}
            onToggleVisited={toggleVisited}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
