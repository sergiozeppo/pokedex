import { combineReducers, configureStore } from '@reduxjs/toolkit';
import selectedPokemonsSlice from './reducers/selectedPokemonsSlice';
import { pokemonApi } from '../services/api';
import allPokemonsSlice from './reducers/allPokemonsSlice';
import currentPokemonsSlice from './reducers/currentPokemonsSlice';
import loadingSlice from './reducers/loadingSlice';
import searchQuerySlice from './reducers/searchQuerySlice';

const rootReducer = combineReducers({
  loading: loadingSlice,
  selectedPokemonsSlice,
  searchQuerySlice,
  allPokemonsSlice,
  currentPokemonsSlice,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
