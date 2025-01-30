const URL = 'https://pokeapi.co/api/v2/pokemon/';

export const fetchData = async () => {
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error('Error fetching pokemons');
  }

  const result = await response.json();
  console.log(result.results);
  return result.results;
};

export const fetchPokemonDetails = async (name: string) => {
  const response = await fetch(`${URL}${name}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon details');
  }
  return response.json();
};
