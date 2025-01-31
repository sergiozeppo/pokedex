import { Ability, Pokemon } from '../types/types';

const URL = 'https://pokeapi.co/api/v2/pokemon/';

export const fetchData = async (): Promise<Pokemon[]> => {
  try {
    const response = await fetch(`${URL}?offset=0&limit=20`);
    if (!response.ok) {
      throw new Error('Error fetching pokemons');
    }
    const result = await response.json();
    return result.results;
  } catch (error) {
    console.error('Error in fetchData:', error);
    throw error;
  }
};

export const fetchPokemonDetails = async (name: string) => {
  try {
    const response = await fetch(`${URL}${name}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon details');
    }
    return response.json();
  } catch (error) {
    console.error('Error in fetchPokemonDetails:', error);
    throw error;
  }
};

export const fetchSearchData = async (
  name: string,
  allPokemons: Pokemon[]
): Promise<Pokemon[]> => {
  try {
    const filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(name.toLowerCase())
    );

    const pokemonsWithDetails = await Promise.all(
      filteredPokemons.map(async (pokemon) => {
        const details = await fetchPokemonDetails(pokemon.name);
        return {
          id: details.id,
          name: details.name,
          imageUrl:
            details.sprites.other.dream_world.front_default ||
            details.sprites.other['official-artwork'].front_default ||
            details.sprites.front_default,
          abilities: details.abilities.map(
            (ability: Ability) => ability.ability.name
          ),
        };
      })
    );

    return pokemonsWithDetails;
  } catch (error) {
    console.error('Error in fetchSearchData:', error);
    throw error;
  }
};
