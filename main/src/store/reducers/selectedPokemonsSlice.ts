import { createSlice } from '@reduxjs/toolkit';

type SelectedPokemonsState = string[];
const initialState: SelectedPokemonsState = [];

const selectedPokemonsSlice = createSlice({
  name: 'selectedPokemons',
  initialState,
  reducers: {
    selectPokemon(state, action) {
      state.push(action.payload);
      console.log(state.length);
    },
    unselectPokemon(state, action) {
      return state.filter((pokemon) => pokemon !== action.payload);
    },
  },
});

export const { selectPokemon, unselectPokemon } = selectedPokemonsSlice.actions;
export default selectedPokemonsSlice.reducer;
