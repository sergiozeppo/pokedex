import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { inferred } from '../../constants/validation-schema';

export type FormData = Omit<inferred, 'picture'> & { picture: string };

const initialState: FormData[] = [];

export const formDataSlice = createSlice({
  initialState,
  name: 'formData',
  reducers: {
    saveForm: (state, action: PayloadAction<FormData>) => {
      state.unshift(action.payload);
    },
  },
});

export const { saveForm } = formDataSlice.actions;
