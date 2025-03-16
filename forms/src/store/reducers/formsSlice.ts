import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InferredType } from '../../constants/validation-schema';

export type FormData = Omit<InferredType, 'picture'> & { picture: string };

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
