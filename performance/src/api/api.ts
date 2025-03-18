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

export const fetchCountries = async () => {
  return await fetch('https://restcountries.com/v3.1/all')
    .then((response) => response.json())
    .then((data) => {
      return data as Country[];
    })
    .catch((error) => {
      console.error('Error in fetchData:', error);
      throw error;
    });
};
