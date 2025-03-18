import { useEffect, useState } from 'react';
import './App.css';
import { Country, fetchCountries } from './api/api';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCountries()
      .then(setCountries)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {countries.map((country) => (
        <div
          key={country.name.common}
          className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">{country.name.common}</h3>
            <p className="text-gray-700">Population: {country.population}</p>
            <p className="text-gray-700">Region: {country.region}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
