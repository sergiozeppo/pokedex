export interface Country {
  name: {
    common: string;
  };
  population: number;
  flags: {
    png: string;
    svg: string;
  };
  region: string;
}

const cache: { data: Country[] | null } = { data: null };

export const fetchCountries = async () => {
  if (cache.data) return cache.data;

  return fetch('https://restcountries.com/v3.1/all')
    .then((response) => response.json())
    .then((data) => {
      cache.data = data as Country[];
      return cache.data;
    })
    .catch((error) => {
      console.error('Error in fetchData:', error);
      throw error;
    });
};
