import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from '../../types/types';

export interface CurrentPokemonsState {
  pokemons: Pokemon[];
}

const initialState: CurrentPokemonsState = {
  pokemons: [],
};

const currentPokemonsSlice = createSlice({
  name: 'CurrentPokemons',
  initialState,
  reducers: {
    setCurrentPokemons: (state, action: PayloadAction<Pokemon[]>) => {
      state.pokemons = action.payload;
    },
  },
});

export const { setCurrentPokemons } = currentPokemonsSlice.actions;
export default currentPokemonsSlice.reducer;
