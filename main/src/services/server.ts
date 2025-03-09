import { POKEMONS_LIMIT, URL } from '../constants/constants';
import { Pokemon, PokemonData, PokemonDetails } from '../types/types';

export const fetchData = async (): Promise<Pokemon[]> => {
  return await fetch(`${URL}?offset=0&limit=${POKEMONS_LIMIT}`)
    .then((response) => response.json())
    .then((data) => {
      return data.results as Pokemon[];
    })
    .catch((error) => {
      console.error('Error in fetchData:', error);
      throw error;
    });
};

export const fetchPokemonDetails = async (name: string) => {
  return await fetch(`${URL}${name}`)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data as PokemonDetails;
    })
    .catch((error) => {
      console.error('Error in fetchPokemonDetails:', error);
      throw error;
    });
};

export const fetchPokemonOutletDetails = async (name: string) => {
  return await fetch(`${URL}${name}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return {
        id: data.id,
        name: data.name,
        types: data.types,
        weight: data.weight,
        height: data.height,
        moves: data.moves,
        stats: data.stats,
        imageUrl:
          data.sprites?.other.dream_world.front_default ||
          data.sprites?.other['official-artwork'].front_default ||
          data.sprites?.front_default ||
          './assets/img/poke-loader.png',
        abilities: data.abilities,
      } as PokemonData;
    })
    .catch((error) => {
      console.error('Error in fetchPokemonOutletDetails:', error);
      throw error;
    });
};
