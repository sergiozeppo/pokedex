import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonDetails } from '../../types/types';

export type SelectedPokemonsState = PokemonDetails[];
const initialState: SelectedPokemonsState = [];

const selectedPokemonsSlice = createSlice({
  name: 'selectedPokemons',
  initialState,
  reducers: {
    selectPokemon: (state, action: PayloadAction<PokemonDetails>) => {
      const alreadySelect = state.find(
        (pokemon) => pokemon.id === action.payload.id
      );
      if (!alreadySelect) {
        state.push(action.payload);
      }
    },
    unselectPokemon: (state, action: PayloadAction<number>) => {
      return state.filter((pokemon) => pokemon.id !== action.payload);
    },
    clearSelectedPokemons: () => initialState,
  },
});

export const { selectPokemon, unselectPokemon, clearSelectedPokemons } =
  selectedPokemonsSlice.actions;
export default selectedPokemonsSlice.reducer;
