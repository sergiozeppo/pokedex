import { createSlice } from '@reduxjs/toolkit';
import { COUNTRIES_LIST } from '../../constants/constants';

export const countriesListSlice = createSlice({
  initialState: COUNTRIES_LIST,
  name: 'countries',
  reducers: {},
});
