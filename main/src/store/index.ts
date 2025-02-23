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

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
