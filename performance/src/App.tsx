import { useState, useEffect } from 'react';
import { Country, fetchCountries } from './api/api';
import Card from './components/Card/Card';
import Header from './components/Header/Header';
import './App.css';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortOrder, setSortOrder] = useState({ key: 'name', asc: true });

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  useEffect(() => {
    let result = [...countries];

    if (searchTerm) {
      result = result.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRegion) {
      result = result.filter((country) => country.region === selectedRegion);
    }

    result.sort((a, b) => {
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

    setFilteredCountries(result);
  }, [searchTerm, selectedRegion, sortOrder, countries]);

  return (
    <div className="p-4">
      <Header
        searchTerm={searchTerm}
        selectedRegion={selectedRegion}
        sortOrder={sortOrder}
        onSearch={setSearchTerm}
        onFilter={setSelectedRegion}
        onSort={(key, asc) => setSortOrder({ key, asc })}
      />

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCountries.map((country) => (
          <Card
            key={country.name.common}
            name={country.name.common}
            flag={country.flags.svg}
            population={country.population}
            region={country.region}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
