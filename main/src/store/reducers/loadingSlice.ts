import { createSlice } from '@reduxjs/toolkit';

export interface LoadingState {
  pendingRequests: number;
  isLoading: boolean;
}

const initialState: LoadingState = {
  pendingRequests: 0,
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.pendingRequests++;
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.pendingRequests = Math.max(0, state.pendingRequests - 1);
      state.isLoading = state.pendingRequests > 0;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.pendingRequests++;
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      (action) =>
        action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
      (state) => {
        state.pendingRequests = Math.max(0, state.pendingRequests - 1);
        state.isLoading = state.pendingRequests > 0;
      }
    );
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
