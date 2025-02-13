import { configureStore } from '@reduxjs/toolkit';
import selectedPokemonsSlice from './reducers/selectedPokemonsSlice';

export const store = configureStore({
  reducer: { selectedPokemonsSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
