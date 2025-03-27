import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { URL, POKEMONS_LIMIT } from '../constants/constants';
import { Pokemon, PokemonDetails, Ability, PokemonData } from '../types/types';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getPokemons: builder.query<Pokemon[], undefined>({
      query: () => `?offset=0&limit=${POKEMONS_LIMIT}`,
      transformResponse: (response: { results: Pokemon[] }) => response.results,
    }),
    getPokemonDetails: builder.query<PokemonDetails, string>({
      query: (name) => `${name}`,
      transformResponse: (details: PokemonData): PokemonDetails => ({
        id: details.id,
        name: details.name,
        imageUrl:
          details.sprites?.other.dream_world.front_default ||
          details.sprites?.other['official-artwork'].front_default ||
          details.sprites?.front_default ||
          './assets/img/poke-loader.png',
        abilities: details.abilities.map(
          (ability: Ability) => ability.ability.name
        ),
      }),
    }),
    getPokemonOutletDetails: builder.query<PokemonData, string>({
      query: (name) => `${name}`,
      transformResponse: (response: PokemonData) => ({
        id: response.id,
        name: response.name,
        types: response.types,
        weight: response.weight,
        height: response.height,
        moves: response.moves,
        stats: response.stats,
        imageUrl:
          response.sprites?.other.dream_world.front_default ||
          response.sprites?.other['official-artwork'].front_default ||
          response.sprites?.front_default ||
          './assets/img/poke-loader.png',
        abilities: response.abilities,
      }),
    }),
    searchPokemons: builder.query<PokemonDetails[], string>({
      async queryFn(searchTerm, _, __, fetchWithBQ) {
        const pokemonsResult = await fetchWithBQ(
          `?offset=0&limit=${POKEMONS_LIMIT}`
        );
        if (pokemonsResult.error)
          return { error: pokemonsResult.error as FetchBaseQueryError };
        const allPokemons = (pokemonsResult.data as { results: Pokemon[] })
          .results;

        const filteredPokemons = allPokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const detailsPromises = filteredPokemons.map(async (pokemon) => {
          const detailsResult = await fetchWithBQ(`${pokemon.name}`);
          if (detailsResult.error) return null;
          const details = detailsResult.data as PokemonData;
          return {
            id: details.id,
            name: details.name,
            imageUrl:
              details.sprites?.other.dream_world.front_default ||
              details.sprites?.other['official-artwork'].front_default ||
              details.sprites?.front_default ||
              './assets/img/poke-loader.png',
            abilities: details.abilities.map(
              (ability: Ability) => ability.ability.name
            ),
          } as PokemonDetails;
        });
        const detailsArray = await Promise.all(detailsPromises);
        return { data: detailsArray.filter(Boolean) as PokemonDetails[] };
      },
    }),
  }),
});

export const {
  useGetPokemonsQuery,
  useGetPokemonDetailsQuery,
  useGetPokemonOutletDetailsQuery,
  useSearchPokemonsQuery,
} = pokemonApi;
