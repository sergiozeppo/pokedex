import { Ability } from '../types/types';

const URL = 'https://pokeapi.co/api/v2/pokemon/';

export const fetchData = async () => {
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error('Error fetching pokemons');
  }

  const result = await response.json();
  return result.results;
};

export const fetchPokemonDetails = async (name: string) => {
  const response = await fetch(`${URL}${name}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon details');
  }
  return response.json();
};

export const fetchSearchData = async (name: string) => {
  const response = await fetch(`${URL}${name}`);
  if (!response.ok) {
    throw new Error('Error fetching pokemons');
  }
  const result = await response.json();
  const pokemon = {
    id: result.id,
    name: result.name,
    imageUrl:
      result.sprites.other.dream_world.front_default ||
      result.sprites.other['official-artwork'].front_default ||
      result.sprites.front_default,
    abilities: result.abilities.map((ability: Ability) => ability.ability.name),
  };
  return [pokemon];
};
