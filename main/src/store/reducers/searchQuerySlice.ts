import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchQueryState {
  value: string;
}

const getInitialQuery = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('q') || localStorage.getItem('searchPokemon') || '';
};

export const initialState: SearchQueryState = {
  value: getInitialQuery(),
};

const searchQuerySlice = createSlice({
  name: 'searchQuery',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.value = action.payload;
      if (action.payload) {
        localStorage.setItem('searchPokemon', action.payload);
      } else {
        localStorage.removeItem('searchPokemon');
      }
    },
  },
});

export const { setSearchQuery } = searchQuerySlice.actions;
export default searchQuerySlice.reducer;
