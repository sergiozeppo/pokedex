import { configureStore } from '@reduxjs/toolkit';
import { countriesListSlice } from './reducers/countriesSlice';

export const store = configureStore({
  reducer: {
    countries: countriesListSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
