import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from '../../types/types';

export interface AllPokemonsState {
  pokemons: Pokemon[];
}

const initialState: AllPokemonsState = {
  pokemons: [],
};

const allPokemonsSlice = createSlice({
  name: 'allPokemons',
  initialState,
  reducers: {
    setAllPokemons: (state, action: PayloadAction<Pokemon[]>) => {
      state.pokemons = action.payload;
    },
  },
});

export const { setAllPokemons } = allPokemonsSlice.actions;
export default allPokemonsSlice.reducer;
