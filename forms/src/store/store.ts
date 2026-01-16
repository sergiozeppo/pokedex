import { configureStore } from '@reduxjs/toolkit';
import { countriesListSlice } from './reducers/countriesSlice';
import { formDataSlice } from './reducers/formsSlice';

export const store = configureStore({
  reducer: {
    countries: countriesListSlice.reducer,
    formData: formDataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
